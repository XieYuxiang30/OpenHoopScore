import mongoose from 'mongoose'

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
  },
  stats: {
    points: { type: Number, default: 0 },
    fouls: { type: Number, default: 0 },
    rebounds: { type: Number, default: 0 },
    assists: { type: Number, default: 0 },
  },
}, {
  timestamps: true,
})

export default mongoose.model('Player', playerSchema)
