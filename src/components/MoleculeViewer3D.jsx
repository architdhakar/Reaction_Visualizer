import React, { useEffect, useRef } from 'react'
import * as $3Dmol from '3dmol'

export default function MoleculeViewer3D({ smiles }) {
  const viewerRef = useRef(null)
  const viewerId = `viewer-${Math.random().toString(36).substr(2, 9)}`

  useEffect(() => {
    // For simplicity, we'll fetch 3D structure from PubChem using SMILES
    // Alternatively, we could use RDKit.js to generate 3D coordinates
    const fetchAndDisplay = async () => {
      const element = document.getElementById(viewerId)
      const viewer = $3Dmol.createViewer(element, {
        backgroundColor: 'white'
      })

      // Fetch 3D SDF from PubChem
      const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/smiles/${encodeURIComponent(smiles)}/SDF?record_type=3d`
      try {
        const response = await fetch(url)
        const sdf = await response.text()
        viewer.addModel(sdf, 'sdf')
        viewer.setStyle({}, { stick: { colorscheme: 'Jmol' } })
        viewer.zoomTo()
        viewer.render()
      } catch (error) {
        console.error('Failed to load molecule', error)
        viewer.addModel('', '')
      }
    }

    fetchAndDisplay()
  }, [smiles, viewerId])

  return <div id={viewerId} ref={viewerRef} style={{ width: '100%', height: '100%' }} />
}