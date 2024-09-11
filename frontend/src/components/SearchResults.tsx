import * as React from "react"
import { useNavigate } from "react-router-dom"
import { useMediaQuery } from "usehooks-ts"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetClose, SheetFooter } from "@/components/ui/sheet"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { useSearch } from '@/contexts/SearchContext'
import { Track, usePlayer } from '@/contexts/PlayerContext'

export function SearchResults() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const { searchResults } = useSearch()
  const { setCurrentTrack } = usePlayer()
  const navigate = useNavigate()

  const handleTrackSelect = (track:Track) => {
    setCurrentTrack(track)
    navigate(`/player/${track.id}`)
    setOpen(false)
  }

  const ResultsContent = () => (
    <div className="space-y-3 max-w-full overflow-hidden overscroll-y-auto px-4 my-6">
      {searchResults.map((track) => (
        <Card key={track.id} onClick={() => handleTrackSelect(track)} className="cursor-pointer hover:bg-muted">
          <CardHeader>
            <CardTitle>{track.title}</CardTitle>
            <CardDescription>{track.artist}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  )

  if (isDesktop) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button type="submit" size="icon"><MagnifyingGlassIcon /></Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="flex items-center"><MagnifyingGlassIcon className="mr-2" />Search Results</SheetTitle>
            <SheetDescription>
              Find the track that corresponds best to your search.
            </SheetDescription>
          </SheetHeader>
          <ResultsContent />
          <SheetFooter className="bottom-5">
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button type="submit" size="icon"><MagnifyingGlassIcon /></Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="flex items-center"><MagnifyingGlassIcon className="mr-2" />Search Results</DrawerTitle>
          <DrawerDescription>
            Find the track that corresponds best to your search.
          </DrawerDescription>
        </DrawerHeader>
        <ResultsContent />
        <DrawerFooter className="pt-2 bottom-5">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}