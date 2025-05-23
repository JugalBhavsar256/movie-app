const API_KEY = "191efd88884f8279be9301a301a0c41b";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
   const response =await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
   const data = await response.json()
   console.log(data)
   return data.results 
}

export const searchMovies = async (query) => {
   const response =await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
   const data = await response.json()
   return data.results 
}

export const getGenres = async (movie_id) => {
  const response =await fetch(`${BASE_URL}/movie/${movie_id}?api_key=${API_KEY}`);
  const data = await response.json()
  console.log(data)
  return data.genres
}
