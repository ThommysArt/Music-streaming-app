import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { SearchResults } from '@/components/SearchResults'
import { useSearch } from '@/contexts/SearchContext'

export const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const { searchTracks } = useSearch()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    searchTracks(searchQuery)
  }

  return (
    <div className="flex flex-col gap-8 justify-between min-h-screen p-8 md:p-20">
      <div />
      <div className="text-center">
        <h1 className="font-bold text-3xl my-4 text-orange-950 dark:text-orange-50">
          Welcome to our Music Streaming Website!
        </h1>
        <p className='font-semibold text-lg text-muted-foreground'>
          R&B, Calm, Hip Hop, Electro, Reggae, Rock, K-pop, Metal, Jazz, Rap, ... We got all that.
        </p>
      </div>
      <form onSubmit={handleSearch} className="flex items-center space-x-2 justify-center">
        <Input 
          type="text" 
          placeholder="Search Music title" 
          className="max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchResults />
      </form>
    </div>
  )
}