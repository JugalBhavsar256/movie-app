import React from 'react'
import MovieCard from '../components/MovieCard'
import { useState, useEffect } from 'react'
import { searchMovies, getPopularMovies, getGenres } from '../services/api'
import '../css/Home.css'

function Home() {
    const [searchQuery, setSearchQuery] = useState("")
     const [currentQuery, setCurrentQuery] = useState(null)
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(null)

    useEffect(() => {
        loadPopularMovies(1, null)
    }, [])

   
    const loadPopularMovies = async (pageToLoad, query = null) => {
        setLoading(true)
        try {
            const { movies: newMovies, totalPages } = query
                ? await searchMovies(query, pageToLoad)
                : await getPopularMovies(pageToLoad)

            if (pageToLoad === 1) {
                setMovies(newMovies)
            } else {
                setMovies((prev) => [...prev, ...newMovies])
            }

            setPage(pageToLoad)
            setTotalPages(totalPages)
            setError(null)
             setCurrentQuery(query)
        } catch (err) {
            console.log(err)
            setError('Failed to load movies...')
        } finally {
            setLoading(false)
        }
    }

     const handleSearch = async (e) => {
        e.preventDefault()
        const trimmedQuery = searchQuery.trim()
        if (!trimmedQuery) return
        setMovies([])    
        setPage(1)        
        loadPopularMovies(1, trimmedQuery)
    };
    
    const loadMoreMovies = () => {
        if (page < totalPages && !loading) {
            loadPopularMovies(page + 1, currentQuery)
        }
    }
    console.log(movies.length)

  return (
    <div className="home">
        <form  onSubmit={handleSearch} className="search-form">
            <input 
            type="text" 
            placeholder="Search for movies..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type ="submit" className="search-button">Search</button>
        </form>

        {error && <div className="error-message">{error}</div>}
        {movies.length === 0 && !loading && <div>No movies found!!!!!!!</div>}

        <div className="movies-grid">
            {movies.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
            ))}
        </div>
         {loading && <div className="loading">Loading...</div>}
         {!loading && page < totalPages && (
                <button className="load-more-button" onClick={loadMoreMovies}>
                    Load More
                </button>
            )}
    </div>
  )
}

export default Home
