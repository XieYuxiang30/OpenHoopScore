import express from 'express'
import Event from '../models/Event.js'
import Team from '../models/Team.js'

const router = express.Router()

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().populate('teams')
    res.json(events)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('teams')
    res.json(event)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create event
router.post('/', async (req, res) => {
  try {
    const event = new Event(req.body)
    const savedEvent = await event.save()
    res.status(201).json(savedEvent)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Get teams for an event
router.get('/:id/teams', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
    if (!event) {
      return res.status(404).json({ message: 'Event not found' })
    }
    const teams = await Team.find({ eventId: event._id })
    res.json(teams)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
