const API_KEY = "191efd88884f8279be9301a301a0c41b";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async (page = 1) => {
   const response =await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
   const data = await response.json()
   console.log(data)
   return {movies: data.results, totalPages: data.total_pages} 
}

export const searchMovies = async (query, page = 1) => {
   const response =await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`);
   const data = await response.json()
   console.log("API response:", data)
   return {movies: data.results, totalPages: data.total_pages} 
}

export const getGenres = async (movie_id) => {
  const response =await fetch(`${BASE_URL}/movie/${movie_id}?api_key=${API_KEY}`)
  const data = await response.json()
  console.log(data)
  return data.genres
}

export const movieDetails = async (movie_id) => {
  const response = await fetch(`${BASE_URL}/movie/${movie_id}?api_key=${API_KEY}`)
  const data = await response.json()
  return data
}

export const getListOfGenres = async () => {
  const response = await fetch (`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`)
  const data = await response.json()
  return data.genres
}
