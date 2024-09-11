/* eslint-disable @typescript-eslint/no-unused-vars */
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { TrackItem } from '@/components/track-item'

interface TrackItem {
  name: string,
  artist: string
}

export const SearchPage = () => {
    const [searchString, setSearchString] = useState(null)
    const tracks: TrackItem[] = [
      {name: "Mocking Bird", artist: "Eminem"},
      {name: "God's plan", artist: "Drake"},
      {name: "Loading", artist: "Central Cee"},
      {name: "Garden kisses", artist: "Giveon"}
    ]
  return (
    <div className="flex flex-col h-screen gap-8 p-8 md:p-20">
        <div className="flex items-center space-x-2 justify-center">
            <Input type="text" placeholder="Search Music title" className="max-w-sm" />
            <Button type="submit" size="icon"><MagnifyingGlassIcon /></Button>
        </div>
        <div className="space-y-3">
            {tracks.length > 0 && tracks.map((track)=>(
              <TrackItem name={track.name} artist={track.artist} />
            ))}
        </div>
    </div>
  )
}
