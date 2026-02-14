import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import reactionsData from '../data/reactions.json'
import MoleculeViewer3D from './MoleculeViewer3D'
import MechanismPlayer from './MechanismPlayer'
import MemoryStory from './MemoryStory'
import ReagentCard from './ReagentCard'
import PuzzleMode from './PuzzleMode'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../utils/firebase'
import toast from 'react-hot-toast'

export default function ReactionDetail({ user }) {
  const { id } = useParams()
  const reaction = reactionsData.find(r => r.id === id)
  const [saved, setSaved] = useState(false)
  const [note, setNote] = useState('')
  const [activeTab, setActiveTab] = useState('mechanism') // mechanism, puzzle, story

  useEffect(() => {
    if (user && reaction) {
      const fetchProgress = async () => {
        const docRef = doc(db, 'users', user.uid, 'reactions', reaction.id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setSaved(true)
          setNote(docSnap.data().note || '')
        }
      }
      fetchProgress()
    }
  }, [user, reaction])

  const handleSaveProgress = async () => {
    if (!user) {
      toast.error('Please login to save progress')
      return
    }
    try {
      await setDoc(doc(db, 'users', user.uid, 'reactions', reaction.id), {
        reactionId: reaction.id,
        savedAt: new Date(),
        note: note,
      })
      setSaved(true)
      toast.success('Progress saved!')
    } catch (error) {
      toast.error('Failed to save')
    }
  }

  if (!reaction) return <div>Reaction not found</div>

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold mb-2">{reaction.name}</h1>
      <p className="text-gray-600 mb-4">{reaction.chapter}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: 3D Viewers */}
        <div>
          <h3 className="font-semibold mb-2">Reactants</h3>
          <div className="h-64 border rounded-lg overflow-hidden">
            <MoleculeViewer3D smiles={reaction.reactants.join('.')} />
          </div>
          <h3 className="font-semibold mt-4 mb-2">Products</h3>
          <div className="h-64 border rounded-lg overflow-hidden">
            <MoleculeViewer3D smiles={reaction.products.join('.')} />
          </div>
        </div>

        {/* Right: Reagents, Conditions, Save */}
        <div>
          <ReagentCard reagents={reaction.reagents} conditions={reaction.conditions} />
          {user && (
            <div className="mt-4 p-4 bg-gray-50 rounded">
              <label className="block text-sm font-medium">Personal Note</label>
              <textarea
                className="w-full p-2 border rounded mt-1"
                rows="2"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add your own notes..."
              />
              <button
                onClick={handleSaveProgress}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {saved ? 'Update Saved Progress' : 'Save to My Progress'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8 border-b">
        <nav className="flex gap-4">
          <button
            onClick={() => setActiveTab('mechanism')}
            className={`pb-2 px-1 ${activeTab === 'mechanism' ? 'border-b-2 border-blue-600 font-semibold' : 'text-gray-600'}`}
          >
            Mechanism
          </button>
          <button
            onClick={() => setActiveTab('puzzle')}
            className={`pb-2 px-1 ${activeTab === 'puzzle' ? 'border-b-2 border-blue-600 font-semibold' : 'text-gray-600'}`}
          >
            Puzzle
          </button>
          <button
            onClick={() => setActiveTab('story')}
            className={`pb-2 px-1 ${activeTab === 'story' ? 'border-b-2 border-blue-600 font-semibold' : 'text-gray-600'}`}
          >
            Memory Story
          </button>
        </nav>
      </div>

      <div className="mt-4">
        {activeTab === 'mechanism' && (
          <MechanismPlayer steps={reaction.mechanismSteps} />
        )}
        {activeTab === 'puzzle' && (
          <PuzzleMode steps={reaction.mechanismSteps} />
        )}
        {activeTab === 'story' && (
          <MemoryStory story={reaction.memoryStory} funFact={reaction.funFact} />
        )}
      </div>
    </div>
  )
}