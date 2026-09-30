import mongoose from 'mongoose'

const gameEventSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  type: {
    type: String,
    enum: ['score', 'foul', 'timeout', 'substitution'],
    required: true,
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
  },
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
  },
  points: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
  },
}, {
  timestamps: true,
})

export default mongoose.model('GameEvent', gameEventSchema)
