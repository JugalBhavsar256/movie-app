import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { getListOfGenres } from '../services/api'
import '../css/Navbar.css'

function NavBar({ onGenreSelect, onSearch }) {
  const [genreBox, setGenreBox] = useState(false)
  const [genre, setGenre] = useState([])
  const [searchQuery, setSearchQuery] = useState("")


  useEffect(()=> {
    const getGenres = async () => {
      try{
        const getGenreList = await getListOfGenres()
        setGenre(getGenreList)
      }
      catch(err){
        console.error('Failed to load genres', err)

      }
    }
    getGenres()
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    const trimmedQuery = searchQuery.trim()
    if (!trimmedQuery) return
    onSearch(trimmedQuery)
  }

  const handleGenreClick = (genreId) => {
        onGenreSelect(genreId)
        setGenreBox(false)
    }

  return (
    <nav className="navbar">
        <div className="navbar-brand">
            <Link to="/">Movie App</Link>
        </div>
        <div className='navbar-links'>
          <Link to ='/' className="nav-link">Home</Link>
          <Link to ='/favorites' className="nav-link">Favorites</Link>
          <form onSubmit={handleSearch} className="search-form">
            <input 
            type="text"
            placeholder="Search for movies..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">Search</button>
          </form>
          <div className="nav-link genres-dropdown" onClick={() => setGenreBox(!genreBox)}>
            Genres
            {genreBox && (
              <div className='dropdown'>
                <div className="dropdown-item" onClick={() => handleGenreClick("all")}>
                  All
                </div>
                {genre.map(genre => (
                  <div key={genre.id} className="dropdown-item" onClick={() => handleGenreClick(genre.id)}>
                    {genre.name}
                  </div>
                ))}
            </div>
              )}
          </div> 
        </div>
      
    </nav>
  )
}

export default NavBar
