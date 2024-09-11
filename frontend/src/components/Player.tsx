'use client'

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from '@/components/ui/button'
import { Slider } from "@/components/ui/slider"
import { ChevronLeftIcon, DotsVerticalIcon } from '@radix-ui/react-icons'
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import { usePlayer } from '@/contexts/PlayerContext'
import { useNavigate } from 'react-router-dom'

export const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(1)
  const { currentTrack } = usePlayer()
  const audioRef = useRef(new Audio(currentTrack?.audioUrl))
  const navigate = useNavigate()

  useEffect(() => {
    if (currentTrack) {
      audioRef.current.src = currentTrack.audioUrl
      audioRef.current.load()
    }
  }, [currentTrack])

  useEffect(() => {
    const audio = audioRef.current

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100)
    }

    audio.addEventListener('timeupdate', updateProgress)
    return () => audio.removeEventListener('timeupdate', updateProgress)
  }, [])

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleProgressChange = (value: number[]) => {
    const newTime = (value[0] / 100) * audioRef.current.duration
    audioRef.current.currentTime = newTime
    setProgress(value[0])
  }

  const handleVolumeChange = (value: number[]) => {
    audioRef.current.volume = value[0] / 100
    setVolume(value[0] / 100)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className='flex flex-col gap-8 m-8 md:mx-20 max-w-md w-full'>
      <div className="flex justify-between items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => navigate('/')}>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <div className="flex flex-col text-center justify-center">
          <h3 className="text-xl font-bold">{currentTrack?.title}</h3>
          <p className="text-sm text-muted-foreground">{currentTrack?.artist}</p>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full">
          <DotsVerticalIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className="max-w-sm mx-auto w-full">
        <AspectRatio ratio={1} className="bg-muted rounded-full overflow-hidden">
          <img src={currentTrack?.coverUrl || "/placeholder.svg?height=300&width=300"} alt="Album cover" className="object-cover" />
        </AspectRatio>
      </div>
      <div className="space-y-4">
        <Slider
          value={[progress]}
          onValueChange={handleProgressChange}
          max={100}
          step={0.1}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{formatTime(audioRef.current.currentTime)}</span>
          <span>{formatTime(audioRef.current.duration)}</span>
        </div>
        <div className="flex justify-center items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <SkipBack className="h-5 w-5" />
          </Button>
          <Button onClick={togglePlay} size="icon" className="rounded-full h-14 w-14">
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Volume2 className="h-5 w-5 text-muted-foreground" />
          <Slider
            value={[volume * 100]}
            onValueChange={handleVolumeChange}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
      </div>
    </div>
  )
}