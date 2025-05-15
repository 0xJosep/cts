'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

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

  // Initialize on mount, checking for system preference and stored preference
  useEffect(() => {
    // Check for stored preference first
    const storedDarkMode = localStorage.getItem('darkMode')
    if (storedDarkMode !== null) {
      setDarkMode(storedDarkMode === 'true')
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // If no stored preference, check system preference
      setDarkMode(true)
    }

    // Apply theme
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    const newValue = !darkMode
    setDarkMode(newValue)
    localStorage.setItem('darkMode', String(newValue))
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
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