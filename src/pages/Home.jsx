import React from 'react'
import MovieCard from '../components/MovieCard'
import { useState, useEffect } from 'react'
import { searchMovies, getPopularMovies, getGenres } from '../services/api'
import '../css/Home.css'

function Home({currentGenre, searchQuery}) {
    const [currentQuery, setCurrentQuery] = useState(null)
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(null)

    useEffect(() => {
        setMovies([])
        setPage(1)
        loadPopularMovies(1, searchQuery)
    }, [currentGenre, searchQuery])

   
    const loadPopularMovies = async (pageToLoad, query = null) => {
        setLoading(true)
        try {
            const { movies: newMovies, totalPages } = query
                ? await searchMovies(query, pageToLoad)
                : await getPopularMovies(pageToLoad)
            
            let filteredMovies = newMovies
            if(currentGenre !== "all"){
                filteredMovies = newMovies.filter(movie => 
                    movie.genre_ids && movie.genre_ids.includes(parseInt(currentGenre))
                )
            }

            if (pageToLoad === 1) {
                setMovies(filteredMovies)
            } else {
                setMovies((prev) => [...prev, ...filteredMovies])
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
    
    const loadMoreMovies = () => {
        if (page < totalPages && !loading) {
            loadPopularMovies(page + 1, currentQuery)
        }
    }

  return (
    <div className="home">

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
