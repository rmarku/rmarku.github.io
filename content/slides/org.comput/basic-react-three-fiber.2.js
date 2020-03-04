import React from 'react'
import ReactDOM from 'react-dom'
import { Canvas } from 'react-three-fiber'

const Cube = () => {
  return (
    <mesh>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshBasicMaterial attach="material" color="#00ff00" />
    </mesh>
  )
}

ReactDOM.render(
  <Canvas>
    <Cube />
  </Canvas>,
  document.getElementById('root')
)