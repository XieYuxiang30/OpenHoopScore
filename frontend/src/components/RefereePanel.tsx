import { useState, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'

interface Team {
  _id: string
  name: string
  score: number
}

interface GameEvent {
  _id: string
  type: string
  teamId: string
  playerId: string
  points: number
  timestamp: string
}

function RefereePanel() {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [eventId, setEventId] = useState('')
  const [teams, setTeams] = useState<Team[]>([])
  const [events, setEvents] = useState<GameEvent[]>([])
  const [selectedTeam, setSelectedTeam] = useState('')
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const newSocket = io('http://localhost:5000')
    setSocket(newSocket)

    newSocket.on('connect', () => {
      setConnected(true)
    })

    newSocket.on('scoreUpdate', (data: { teams: Team[] }) => {
      setTeams(data.teams)
    })

    newSocket.on('eventLog', (data: { events: GameEvent[] }) => {
      setEvents(data.events)
    })

    return () => {
      newSocket.close()
    }
  }, [])

  const joinEvent = () => {
    if (socket && eventId) {
      socket.emit('joinEvent', eventId)
    }
  }

  const addScore = (points: number) => {
    if (socket && selectedTeam) {
      socket.emit('scoreUpdate', {
        eventId,
        teamId: selectedTeam,
        points,
        type: points === 1 ? 'freeThrow' : points === 2 ? 'fieldGoal' : 'threePointer',
      })
    }
  }

  const addFoul = () => {
    if (socket && selectedTeam) {
      socket.emit('foul', {
        eventId,
        teamId: selectedTeam,
      })
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">裁判计分面板</h1>

      {!connected && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          正在连接服务器...
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            赛事 ID
          </label>
          <input
            type="text"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="输入赛事 ID"
          />
          <button
            onClick={joinEvent}
            className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            加入赛事
          </button>
        </div>

        {teams.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              选择球队
            </label>
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">请选择球队</option>
              {teams.map((team) => (
                <option key={team._id} value={team._id}>
                  {team.name} ({team.score}分)
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {selectedTeam && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">计分操作</h2>
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => addScore(1)}
              className="bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition text-lg font-semibold"
            >
              +1 分
            </button>
            <button
              onClick={() => addScore(2)}
              className="bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition text-lg font-semibold"
            >
              +2 分
            </button>
            <button
              onClick={() => addScore(3)}
              className="bg-purple-600 text-white py-4 rounded-lg hover:bg-purple-700 transition text-lg font-semibold"
            >
              +3 分
            </button>
          </div>
          <button
            onClick={addFoul}
            className="mt-4 w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
          >
            记录犯规
          </button>
        </div>
      )}

      {events.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">事件记录</h2>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {events.map((event) => (
              <div key={event._id} className="border-b pb-2 text-sm text-gray-600">
                <span className="font-medium">{event.type}</span> - 
                {new Date(event.timestamp).toLocaleTimeString()}
                {event.points > 0 && <span className="ml-2 text-blue-600">+{event.points}分</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default RefereePanel
