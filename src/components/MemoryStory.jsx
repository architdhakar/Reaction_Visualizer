import React from 'react'

export default function MemoryStory({ story, funFact }) {
  return (
    <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
      <p className="text-lg italic">{story}</p>
      {funFact && <p className="mt-2 text-sm text-gray-600">💡 Fun fact: {funFact}</p>}
    </div>
  )
}