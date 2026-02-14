import React, { useState } from 'react'
import ArrowAnimation from './ArrowAnimation'

export default function MechanismPlayer({ steps }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [playing, setPlaying] = useState(false)

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  const step = steps[currentStep]

  return (
    <div className="p-4 border rounded">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold">Step {step.stepNumber}: {step.description}</h3>
        <div className="flex gap-2">
          <button onClick={prevStep} disabled={currentStep === 0} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">Prev</button>
          <button onClick={nextStep} disabled={currentStep === steps.length-1} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">Next</button>
        </div>
      </div>

      {/* Placeholder for molecule viewer with arrow animation */}
      <div className="relative h-64 border rounded bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">[Molecule visualization with animated arrow]</p>
        <ArrowAnimation from={step.arrowFrom} to={step.arrowTo} />
      </div>

      {step.intermediateSmiles && (
        <div className="mt-2 text-sm text-gray-600">Intermediate: {step.intermediateSmiles}</div>
      )}
    </div>
  )
}