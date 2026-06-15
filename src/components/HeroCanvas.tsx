import { useRef, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function CameraRig() {
  const { camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.8 - camera.position.x) * 0.04
    camera.position.y += (-mouse.current.y * 0.5 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })

  return null
}

function HeroOrb() {
  const coreRef = useRef<THREE.Mesh>(null)
  const wireRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (coreRef.current) {
      coreRef.current.rotation.x = t * 0.08
      coreRef.current.rotation.y = t * 0.12
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = -t * 0.06
      wireRef.current.rotation.y = -t * 0.09
    }
  })

  return (
    <group position={[1.8, 0, 0]}>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.6, 4]} />
        <MeshDistortMaterial
          color="#6366f1"
          distort={0.35}
          speed={2}
          roughness={0.05}
          metalness={0.9}
          emissive="#4f46e5"
          emissiveIntensity={0.6}
        />
      </mesh>
      <mesh ref={wireRef} scale={1.09}>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshStandardMaterial color="#818cf8" wireframe transparent opacity={0.2} />
      </mesh>
    </group>
  )
}

function Rings() {
  const r1 = useRef<THREE.Mesh>(null)
  const r2 = useRef<THREE.Mesh>(null)
  const r3 = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (r1.current) { r1.current.rotation.x = t * 0.25; r1.current.rotation.y = t * 0.15 }
    if (r2.current) { r2.current.rotation.x = -t * 0.18; r2.current.rotation.z = t * 0.12 }
    if (r3.current) { r3.current.rotation.y = t * 0.2; r3.current.rotation.z = -t * 0.08 }
  })

  return (
    <group position={[1.8, 0, 0]}>
      <mesh ref={r1}>
        <torusGeometry args={[2.4, 0.012, 16, 120]} />
        <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={2} />
      </mesh>
      <mesh ref={r2}>
        <torusGeometry args={[3.1, 0.008, 16, 120]} />
        <meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={2} transparent opacity={0.6} />
      </mesh>
      <mesh ref={r3}>
        <torusGeometry args={[3.8, 0.005, 16, 120]} />
        <meshStandardMaterial color="#4f46e5" emissive="#4f46e5" emissiveIntensity={2} transparent opacity={0.4} />
      </mesh>
    </group>
  )
}

function FloatingShapes() {
  const shapes: { pos: [number, number, number]; type: number; scale: number; speed: number }[] = [
    { pos: [-1.5, 2.2, -2],  type: 0, scale: 0.18, speed: 1.2 },
    { pos: [4.5, 1.8, -1.5], type: 1, scale: 0.14, speed: 0.9 },
    { pos: [-0.5, -2.4, -1], type: 2, scale: 0.2,  speed: 1.5 },
    { pos: [3.8, -1.9, -2],  type: 0, scale: 0.12, speed: 1.1 },
    { pos: [-2.8, -0.5, -2], type: 1, scale: 0.16, speed: 0.8 },
    { pos: [5.2, 0.5, -1],   type: 2, scale: 0.1,  speed: 1.3 },
    { pos: [0.5, 3.0, -2],   type: 1, scale: 0.13, speed: 1.0 },
    { pos: [-2.0, 1.0, -3],  type: 2, scale: 0.11, speed: 0.7 },
  ]

  return (
    <>
      {shapes.map((s, i) => (
        <Float key={i} speed={s.speed} rotationIntensity={0.6} floatIntensity={0.6}>
          <mesh position={s.pos} scale={s.scale}>
            {s.type === 0 && <octahedronGeometry args={[1]} />}
            {s.type === 1 && <tetrahedronGeometry args={[1]} />}
            {s.type === 2 && <dodecahedronGeometry args={[1]} />}
            <meshStandardMaterial
              color={i % 2 === 0 ? '#6366f1' : '#818cf8'}
              emissive={i % 2 === 0 ? '#4f46e5' : '#6366f1'}
              emissiveIntensity={0.8}
              metalness={0.9}
              roughness={0.1}
              transparent
              opacity={0.85}
            />
          </mesh>
        </Float>
      ))}
    </>
  )
}

function Particles() {
  const ref = useRef<THREE.Points>(null)
  const count = 2500

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 20
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3
    }
    return arr
  }, [])

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.015
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#6366f1" transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

export default function HeroCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 60 }} gl={{ antialias: true, alpha: false }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <color attach="background" args={['#f8fafc']} />
        <fog attach="fog" args={['#f8fafc', 12, 28]} />
        <ambientLight intensity={0.8} />
        <pointLight position={[5, 5, 5]} color="#6366f1" intensity={4} />
        <pointLight position={[-5, -3, 3]} color="#4f46e5" intensity={2.5} />
        <pointLight position={[0, 0, 8]} color="#818cf8" intensity={1.5} />
        <CameraRig />
        <HeroOrb />
        <Rings />
        <FloatingShapes />
        <Particles />
      </Suspense>
    </Canvas>
  )
}
