import React from 'react'
import '../css/Favorites.css'
import { useMovieContext } from '../context/MovieContext'
import MovieCard from '../components/MovieCard'

function Favorites() {
  const {favorites} = useMovieContext();

  if (favorites.length > 0){
    return <div className="movies-grid">
            {favorites.map((movie) => (
               <MovieCard movie={movie} key={movie.id} />
                ))}
        </div>
  }

  return (
    <div className="favorites">
      <h2>Your Favorties</h2>
      <div className="favorites-empty">
        <h2>No Favorite Movies Yet</h2>
        <p> Start adding movies to your favorites and they will show here </p> 
      </div>
    </div>
  )
}

export default Favorites
