import React, { useState, useEffect } from 'react'
import { movieDetails } from '../services/api'
import { useParams } from 'react-router-dom'
import '../css/MoviePage.css'

function MoviePage() {
    const [movie, setMovie] = useState(null)
    const {id} = useParams()

    useEffect (() => {
        const loadMovies = async() => {
            try{
                const data = await movieDetails(id)
                setMovie(data)
                console.log(data)
            }
            catch(err){
                console.log(err)
            }
        }
        loadMovies()
        console.log(movie)
    }, [id])
  return (
    <div className="movie-detail">
        <img src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`} alt={movie?.title} />
        <div className="movie-detail-content">
            <h1> {movie?.title} </h1>
            <h2>Tagline: {movie?.tagline}</h2>
            <p>Release Date: {movie?.release_date}</p>
            <p className="genres">Genres: {movie?.genres.map(g => g.name).join(', ')}</p>
            <p>Overview: {movie?.overview}</p>
            <p className="country">Origin Country: {movie?.origin_country.join(', ')}</p>
            <p>Length: {movie?.runtime} min</p>
            <p className="companies">Production Companies: {movie?.production_companies.map(g => g.name).join(', ')}</p>
        </div>
    </div>
  )
}

export default MoviePage
