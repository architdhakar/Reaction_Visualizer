import React, { useEffect, useState } from 'react'
import { collection, query, getDocs } from 'firebase/firestore'
import { db } from '../utils/firebase'
import { Link } from 'react-router-dom'
import reactionsData from '../data/reactions.json'

export default function ProgressTracker({ user }) {
  const [savedReactions, setSavedReactions] = useState([])

  useEffect(() => {
    if (!user) return
    const fetchSaved = async () => {
      const q = query(collection(db, 'users', user.uid, 'reactions'))
      const snapshot = await getDocs(q)
      const saved = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setSavedReactions(saved)
    }
    fetchSaved()
  }, [user])

  if (!user) return <div>Please login to see your progress.</div>

  return (
    <div className="bg-white rounded shadow p-6">
      <h2 className="text-2xl font-bold mb-4">My Saved Reactions</h2>
      {savedReactions.length === 0 ? (
        <p>You haven't saved any reactions yet.</p>
      ) : (
        <div className="grid gap-4">
          {savedReactions.map(saved => {
            const reaction = reactionsData.find(r => r.id === saved.reactionId)
            return (
              <div key={saved.id} className="border p-4 rounded">
                <Link to={`/reaction/${reaction.id}`} className="text-lg font-semibold text-blue-600">{reaction.name}</Link>
                {saved.note && <p className="mt-2 text-gray-700">📝 {saved.note}</p>}
                <p className="text-xs text-gray-400">Saved on {new Date(saved.savedAt?.seconds * 1000).toLocaleDateString()}</p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}