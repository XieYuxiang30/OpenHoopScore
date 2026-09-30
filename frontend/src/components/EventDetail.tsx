import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

interface Event {
  _id: string
  name: string
  date: string
  location: string
  teams: string[]
  status: string
}

interface Team {
  _id: string
  name: string
  score: number
}

function EventDetail() {
  const { id } = useParams<{ id: string }>()
  const [event, setEvent] = useState<Event | null>(null)
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetchEventDetail()
    }
  }, [id])

  const fetchEventDetail = async () => {
    try {
      const [eventRes, teamsRes] = await Promise.all([
        axios.get(`/api/events/${id}`),
        axios.get(`/api/events/${id}/teams`),
      ])
      setEvent(eventRes.data)
      setTeams(teamsRes.data)
    } catch (error) {
      console.error('Failed to fetch event detail:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8">加载中...</div>
  }

  if (!event) {
    return <div className="text-center py-8 text-red-600">赛事不存在</div>
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{event.name}</h1>
        <div className="grid grid-cols-2 gap-4 text-gray-600">
          <p>📅 {event.date}</p>
          <p>📍 {event.location}</p>
          <p>状态: {event.status}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">实时比分</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teams.map((team) => (
            <div key={team._id} className="border rounded-lg p-4 text-center">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">{team.name}</h3>
              <div className="text-4xl font-bold text-blue-600">{team.score}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">数据统计</h2>
        <div className="text-gray-500 text-center py-8">
          数据统计功能开发中...
        </div>
      </div>
    </div>
  )
}

export default EventDetail
