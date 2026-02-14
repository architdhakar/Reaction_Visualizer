import React from 'react'

export default function ReagentCard({ reagents, conditions }) {
  return (
    <div className="p-4 bg-blue-50 rounded">
      <h3 className="font-bold">Reagents & Conditions</h3>
      <p><span className="font-medium">Reagents:</span> {reagents}</p>
      <p><span className="font-medium">Conditions:</span> {conditions}</p>
    </div>
  )
}