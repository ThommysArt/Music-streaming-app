import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Player } from '@/components/Player'
import { usePlayer } from '@/contexts/PlayerContext'

export const PlayerPage = () => {
  const { trackId } = useParams()
  const navigate = useNavigate()
  const { currentTrack, setCurrentTrack } = usePlayer()

  useEffect(() => {
    if (!currentTrack && trackId) {
      // Fetch track details from API using trackId
      // For now, we'll use a mock function
      const fetchTrack = async () => {
        const response = await fetch(`/api/tracks/${trackId}`)
        const track = await response.json()
        setCurrentTrack(track)
      }
      fetchTrack()
    }
  }, [trackId, currentTrack, setCurrentTrack])

  if (!currentTrack) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Player />
    </div>
  )
}