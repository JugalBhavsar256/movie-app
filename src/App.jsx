import './css/App.css'
import MovieCard from './components/MovieCard'
import Favorites from './pages/Favorites'
import Home from './pages/Home'
import MoviePage from './pages/MoviePage'
import { MovieProvider } from './context/MovieContext'
import NavBar from './components/NavBar'
import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/favorites" element={<Favorites />}/>
          <Route path="/movie/:id" element={<MoviePage />} />
        </Routes>
     </main>
    </MovieProvider>
  )
}

export default App
