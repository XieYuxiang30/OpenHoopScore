import { Routes, Route, Link } from 'react-router-dom'
import EventList from './components/EventList'
import EventDetail from './components/EventDetail'
import RefereePanel from './components/RefereePanel'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">🏀 OpenHoopScore</Link>
          <div className="space-x-4">
            <Link to="/" className="hover:text-blue-200">赛事列表</Link>
            <Link to="/referee" className="hover:text-blue-200">裁判端</Link>
          </div>
        </div>
      </nav>
      
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/referee" element={<RefereePanel />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
