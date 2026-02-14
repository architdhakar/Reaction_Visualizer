import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import reactionsData from '../data/reactions.json'

export default function ChapterList({ user }) {
  const [chapters, setChapters] = useState([])
  const [selectedChapter, setSelectedChapter] = useState(null)

  useEffect(() => {
    // Extract unique chapters
    const uniqueChapters = [...new Set(reactionsData.map(r => r.chapter))]
    setChapters(uniqueChapters)
  }, [])

  const reactionsForChapter = selectedChapter
    ? reactionsData.filter(r => r.chapter === selectedChapter)
    : []

  return (
    <div className="flex gap-6">
      <div className="w-1/3 bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-bold mb-4">Chapters</h2>
        <ul>
          {chapters.map(ch => (
            <li key={ch}>
              <button
                onClick={() => setSelectedChapter(ch)}
                className={`w-full text-left p-2 rounded hover:bg-blue-50 ${selectedChapter === ch ? 'bg-blue-100 font-semibold' : ''}`}
              >
                {ch}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-2/3 bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-bold mb-4">
          {selectedChapter ? selectedChapter : 'Select a chapter'}
        </h2>
        {selectedChapter && (
          <div className="grid grid-cols-1 gap-3">
            {reactionsForChapter.map(r => (
              <Link
                key={r.id}
                to={`/reaction/${r.id}`}
                className="block p-4 border rounded-lg hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold">{r.name}</h3>
                <p className="text-sm text-gray-600">{r.reagents} | {r.conditions}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}