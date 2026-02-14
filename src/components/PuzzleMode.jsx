import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

export default function PuzzleMode({ steps }) {
  const [items, setItems] = useState(() => {
    // shuffle steps for puzzle
    return [...steps].sort(() => Math.random() - 0.5).map((s, index) => ({ ...s, id: `step-${index}` }))
  })

  const handleDragEnd = (result) => {
    if (!result.destination) return
    const reordered = Array.from(items)
    const [removed] = reordered.splice(result.source.index, 1)
    reordered.splice(result.destination.index, 0, removed)
    setItems(reordered)
  }

  const checkOrder = () => {
    const correct = items.every((item, idx) => item.stepNumber === steps[idx].stepNumber)
    alert(correct ? 'Correct! Well done.' : 'Not quite. Try again.')
  }

  return (
    <div>
      <p className="mb-4">Arrange the steps in the correct order:</p>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="steps">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
              {items.map((step, index) => (
                <Draggable key={step.id} draggableId={step.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-3 bg-white border rounded shadow"
                    >
                      {step.stepNumber}. {step.description}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button onClick={checkOrder} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">Check Order</button>
    </div>
  )
}