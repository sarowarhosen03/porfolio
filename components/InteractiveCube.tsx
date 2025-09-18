'use client'

import { Atom, Code2, Computer, Database, FileType, Smartphone } from 'lucide-react'
import { useEffect, useRef } from 'react'

const InteractiveCube = () => {
  const cubeRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const cube = cubeRef.current
    if (!cube) return
    const scene = cube.parentElement as HTMLElement | null
    if (!scene) return

    const onMove = (e: MouseEvent) => {
      const rect = scene.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const rotY = (dx / rect.width) * 180
      const rotX = (-dy / rect.height) * 180
      cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`
    }

    const onEnter = () => {
      cube.style.animation = 'none'
      scene.addEventListener('mousemove', onMove)
    }

    const onLeave = () => {
      scene.removeEventListener('mousemove', onMove)
      cube.style.transform = ''
      cube.style.animation = ''
    }

    cube.addEventListener('mouseenter', onEnter)
    cube.addEventListener('mouseleave', onLeave)
    return () => {
      cube.removeEventListener('mouseenter', onEnter)
      cube.removeEventListener('mouseleave', onLeave)
      scene.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <div ref={cubeRef} className="cube">
      <div className="cube-face" style={{ transform: 'translateZ(150px)' }}>
        <Atom className="icon" />
      </div>
      <div className="cube-face" style={{ transform: 'rotateY(180deg) translateZ(150px)' }}>
        <Database className="icon" />
      </div>
      <div className="cube-face" style={{ transform: 'rotateY(90deg) translateZ(150px)' }}>
        <FileType className="icon" />
      </div>
      <div className="cube-face" style={{ transform: 'rotateY(-90deg) translateZ(150px)' }}>
        <Computer className="icon" />
      </div>
      <div className="cube-face" style={{ transform: 'rotateX(90deg) translateZ(150px)' }}>
        <Smartphone className="icon" />
      </div>
      <div className="cube-face" style={{ transform: 'rotateX(-90deg) translateZ(150px)' }}>
        <Code2 className="icon" />
      </div>
    </div>
  )
}

export default InteractiveCube
