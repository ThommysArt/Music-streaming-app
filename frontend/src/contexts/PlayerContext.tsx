import React, { createContext, useContext, useState } from 'react'

export interface Track {
  id: string
  title: string
  artist: string
  album: string
  audioUrl: string
  coverUrl: string
}

interface PlayerContextType {
  currentTrack: Track | null
  setCurrentTrack: (track: Track) => void
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined)

export const usePlayer = () => {
  const context = useContext(PlayerContext)
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider')
  }
  return context
}

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)

  return (
    <PlayerContext.Provider value={{ currentTrack, setCurrentTrack }}>
      {children}
    </PlayerContext.Provider>
  )
}