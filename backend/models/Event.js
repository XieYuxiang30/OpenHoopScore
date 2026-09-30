import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  teams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
  }],
  status: {
    type: String,
    enum: ['未开始', '进行中', '已结束'],
    default: '未开始',
  },
}, {
  timestamps: true,
})

export default mongoose.model('Event', eventSchema)
