import './css/App.css'
import MovieCard from './components/MovieCard'
import Favorites from './pages/Favorites'
import Home from './pages/Home'
import MoviePage from './pages/MoviePage'
import { MovieProvider } from './context/MovieContext'
import NavBar from './components/NavBar'
import {Routes, Route} from 'react-router-dom'
import React, { useState } from 'react'

function App() {
  const [currentGenre, setCurrentGenre] = useState("all")
  const [searchQuery, setSearchQuery] = useState(null)

  return (
    <MovieProvider>
      <NavBar onGenreSelect={setCurrentGenre} onSearch={(query) => setSearchQuery(query)} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home currentGenre={currentGenre} searchQuery={searchQuery}/>}/>
          <Route path="/favorites" element={<Favorites />}/>
          <Route path="/movie/:id" element={<MoviePage />} />
        </Routes>
     </main>
    </MovieProvider>
  )
}

export default App
