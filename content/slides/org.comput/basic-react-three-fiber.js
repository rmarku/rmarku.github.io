import React, { useRef } from 'react'
import ReactDOM from 'react-dom'
import { Canvas, useFrame } from 'react-three-fiber'

const Cube = () => {
  const ref = useRef()

  useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  })

  return (
    <mesh ref={ref} >
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