import React, { createContext, useContext, useState } from 'react'

export interface Track {
    id: string
    title: string
    artist: string
    album: string
    audioUrl: string
    coverUrl: string
  }

interface SearchContextType {
  searchResults: Track[]
  searchTracks: (query: string) => Promise<void>
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export const useSearch = () => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchResults, setSearchResults] = useState<Track[]>([])

  const searchTracks = async (query: string) => {
    try {
        // Fetch data from Django REST api
      const response = await fetch(`/api/tracks?search=${query}`)
      const data = await response.json()
      setSearchResults(data)
    } catch (error) {
      console.error('Error searching tracks:', error)
    }
  }

  return (
    <SearchContext.Provider value={{ searchResults, searchTracks }}>
      {children}
    </SearchContext.Provider>
  )
}