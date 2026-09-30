import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

interface Event {
  _id: string
  name: string
  date: string
  location: string
  teams: string[]
  status: string
}

function EventList() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/api/events')
      setEvents(response.data)
    } catch (error) {
      console.error('Failed to fetch events:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8">加载中...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">赛事列表</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          创建赛事
        </button>
      </div>
      
      {events.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          暂无赛事，点击上方按钮创建第一个赛事
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <Link
              key={event._id}
              to={`/event/${event._id}`}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{event.name}</h2>
              <div className="space-y-1 text-sm text-gray-600">
                <p>📅 {event.date}</p>
                <p>📍 {event.location}</p>
                <p>👥 {event.teams.length} 支球队</p>
                <p className="mt-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    event.status === '进行中' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {event.status}
                  </span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default EventList
