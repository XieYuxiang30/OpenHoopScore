import express from 'express'
import mongoose from 'mongoose'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import dotenv from 'dotenv'
import eventsRouter from './routes/events.js'
import Team from './models/Team.js'
import GameEvent from './models/GameEvent.js'

dotenv.config()

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/events', eventsRouter)

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  socket.on('joinEvent', (eventId) => {
    socket.join(eventId)
    console.log(`User ${socket.id} joined event ${eventId}`)
  })

  socket.on('scoreUpdate', async (data) => {
    try {
      const { eventId, teamId, points, type } = data
      
      // Update team score
      await Team.findByIdAndUpdate(teamId, { $inc: { score: points } })
      
      // Create game event
      const gameEvent = new GameEvent({
        eventId,
        type: 'score',
        teamId,
        points,
        description: `${type}: +${points} points`,
      })
      await gameEvent.save()

      // Get updated teams
      const teams = await Team.find({ eventId })

      // Broadcast to all clients in the event room
      io.to(eventId).emit('scoreUpdate', { teams })
      io.to(eventId).emit('eventLog', { events: await GameEvent.find({ eventId }) })
    } catch (error) {
      console.error('Score update error:', error)
    }
  })

  socket.on('foul', async (data) => {
    try {
      const { eventId, teamId } = data
      
      const gameEvent = new GameEvent({
        eventId,
        type: 'foul',
        teamId,
        description: 'Foul recorded',
      })
      await gameEvent.save()

      io.to(eventId).emit('eventLog', { events: await GameEvent.find({ eventId }) })
    } catch (error) {
      console.error('Foul error:', error)
    }
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
    httpServer.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error)
  })
