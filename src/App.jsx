import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import ChapterList from './components/ChapterList'
import ReactionDetail from './components/ReactionDetail'
import Auth from './components/Auth'
import ProgressTracker from './components/ProgessTracker'
import { auth } from './utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import toast, { Toaster } from 'react-hot-toast'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  if (loading) return <div className="text-center p-8">Loading...</div>

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm p-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-600">🧪 Reaction Visualizer</Link>
          <div className="flex gap-4 items-center">
            {user ? (
              <>
                <Link to="/progress" className="text-gray-700 hover:text-blue-600">My Progress</Link>
                <button onClick={() => auth.signOut()} className="text-red-500">Logout</button>
              </>
            ) : (
              <Link to="/auth" className="text-blue-600">Login / Sign Up</Link>
            )}
          </div>
        </nav>

        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<ChapterList user={user} />} />
            <Route path="/reaction/:id" element={<ReactionDetail user={user} />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/progress" element={<ProgressTracker user={user} />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </BrowserRouter>
  )
}

export default App