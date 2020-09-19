import React from 'react'
import { GeneInput } from './components/GeneInput'

function App() {
  return (
    <div className="App">
      <div style={{ padding: 60 }}>
        <GeneInput onChange={(v) => console.info('onChange', v)} />
      </div>
    </div>
  )
}

export default App
