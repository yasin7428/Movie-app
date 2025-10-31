// src/api/tmdbApi.js

// .env.local file se API key import ki
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// Ye function API se data laane ka saara kaam karega
const fetchFromTMDB = async (endpoint) => {
  // Ye line check karegi ki '?' pehle se hai ya nahi
  const separator = endpoint.includes('?') ? '&' : '?';
  const url = `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data from TMDB:", error);
    throw error; // Error ko aage bhej do taaki component use handle kar sake
  }
};

// Ye function "Trending Movies" laane ke liye hai
export const getTrendingMovies = () => {
  return fetchFromTMDB('/trending/movie/day');
};

export const getMovieDetails = (movieId) => {
  return fetchFromTMDB(`/movie/${movieId}`);
};

export const getMovieCredits = (movieId) => {
  return fetchFromTMDB(`/movie/${movieId}/credits`);
};

export const getSimilarMovies = (movieId) => {
  return fetchFromTMDB(`/movie/${movieId}/similar`);
};


export const searchMovies = (query) => {
  return fetchFromTMDB(`/search/movie?query=${query}`);
};

export const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w1280';


// Hum baad me aur functions bhi add kar sakte hain, jaise:
// export const getMovieDetails = (movieId) => {
//   return fetchFromTMDB(`/movie/${movieId}`);
// };