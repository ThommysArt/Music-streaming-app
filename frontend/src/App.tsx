import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from '@/pages/HomePage'
import { PlayerPage } from '@/pages/PlayerPage'
import { SearchProvider } from '@/contexts/SearchContext'
import { PlayerProvider } from '@/contexts/PlayerContext'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <SearchProvider>
        <PlayerProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path='/player/:trackId' element={<PlayerPage />} />
          </Routes>
        </PlayerProvider>
      </SearchProvider>
    </BrowserRouter>
  )
}

export default App