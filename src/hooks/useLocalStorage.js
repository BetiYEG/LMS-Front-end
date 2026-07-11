import { useState, useEffect } from 'react'

export const useLocalStorage = (key, initialValue) => {
  // Get from local storage then parse stored json or return initialValue
  const readValue = () => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  }

  const [storedValue, setStoredValue] = useState(readValue)

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value) => {
    if (typeof window === 'undefined') {
      console.warn(
        `Tried setting localStorage key "${key}" even though environment is not a client`
      )
    }

    try {
      // Allow value to be a function so we have same API as useState
      const newValue = value instanceof Function ? value(storedValue) : value

      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(newValue))

      // Save state
      setStoredValue(newValue)

      // We dispatch a custom event so every useLocalStorage hook are notified
      window.dispatchEvent(new Event('local-storage'))
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }

  useEffect(() => {
    const handleStorageChange = () => {
      setStoredValue(readValue())
    }

    // Listen for changes to this key in other tabs
    window.addEventListener('storage', handleStorageChange)
    // Listen for custom events from this hook
    window.addEventListener('local-storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('local-storage', handleStorageChange)
    }
  }, [key, readValue])

  return [storedValue, setValue]
}

// Specific localStorage hooks
export const useThemePreference = () => useLocalStorage('theme', 'light')
export const useUserPreferences = () => useLocalStorage('user-preferences', {})
export const useRecentCourses = () => useLocalStorage('recent-courses', [])
export const useViewMode = () => useLocalStorage('view-mode', 'grid')

export default useLocalStorage