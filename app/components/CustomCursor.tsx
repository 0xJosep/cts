'use client'

import { useEffect, useState } from 'react'

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  
  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }
    
    const handleMouseDown = () => {
      setClicked(true)
    }
    
    const handleMouseUp = () => {
      setClicked(false)
    }
    
    const handleMouseLeave = () => {
      setVisible(false)
    }
    
    const handleMouseEnter = () => {
      setVisible(true)
    }
    
    const handleLinkHoverStart = () => {
      setLinkHovered(true)
    }
    
    const handleLinkHoverEnd = () => {
      setLinkHovered(false)
    }
    
    document.addEventListener('mousemove', updatePosition)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    
    // Add event listeners for all clickable elements
    const clickableElements = document.querySelectorAll('a, button, input, [role="button"], .clickable')
    clickableElements.forEach((element) => {
      element.addEventListener('mouseenter', handleLinkHoverStart)
      element.addEventListener('mouseleave', handleLinkHoverEnd)
    })
    
    return () => {
      document.removeEventListener('mousemove', updatePosition)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      
      clickableElements.forEach((element) => {
        element.removeEventListener('mouseenter', handleLinkHoverStart)
        element.removeEventListener('mouseleave', handleLinkHoverEnd)
      })
    }
  }, [])
  
  const dotStyle = {
    transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%) scale(${clicked ? 0.8 : 1})`,
    opacity: visible ? 1 : 0
  }
  
  const ringStyle = {
    transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
    opacity: visible ? (linkHovered ? 0.3 : 0.5) : 0,
    width: linkHovered ? '40px' : 'var(--cursor-size)',
    height: linkHovered ? '40px' : 'var(--cursor-size)'
  }
  
  return (
    <>
      <div 
        className={`cursor-dot ${clicked ? 'cursor-clicked' : ''}`} 
        style={dotStyle}
      />
      <div 
        className={`cursor-ring ${clicked ? 'cursor-clicked' : ''}`} 
        style={ringStyle}
      />
    </>
  )
}

export default CustomCursor 