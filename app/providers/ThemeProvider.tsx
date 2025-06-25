'use client'

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react'

type ThemeProviderProps = {
  children: React.ReactNode
}

type ThemeContextType = {
  darkMode: boolean
  toggleDarkMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [darkMode, setDarkMode] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize theme only once on mount
  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode')
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
    
    const initialDarkMode = storedDarkMode !== null 
      ? storedDarkMode === 'true' 
      : prefersDark

    setDarkMode(initialDarkMode)
    setIsInitialized(true)
    
    // Apply theme immediately
    document.documentElement.classList.toggle('dark', initialDarkMode)
  }, [])

  // Apply theme changes
  useEffect(() => {
    if (isInitialized) {
      document.documentElement.classList.toggle('dark', darkMode)
    }
  }, [darkMode, isInitialized])

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => {
      const newValue = !prev
      localStorage.setItem('darkMode', String(newValue))
      return newValue
    })
  }, [])

  const contextValue = useMemo(() => ({
    darkMode,
    toggleDarkMode
  }), [darkMode, toggleDarkMode])

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

// Custom hook to use the theme context
export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
} 