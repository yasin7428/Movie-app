// src/components/MovieCard.jsx
import React from 'react';
import './MovieCard.css'; // CSS import ki
import { Link } from 'react-router-dom';

// Ye TMDB ki taraf se di gayi image URL hai
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Component ko props se 'movie' object milega
function MovieCard({ movie }) {
  
  // API se humein poora URL nahi milta, sirf path milta hai (e.g., /xyz.jpg)
  // Humein use poora URL banana padta hai
  const imageUrl = `${IMAGE_BASE_URL}${movie.poster_path}`;

  return (
    <div className="movie-card">
    <Link to={`/movie/${movie.id}`} className="movie-link" >
      <img src={imageUrl} alt={movie.title} />
      <div className="movie-info">
        <h3>{movie.title}</h3>
      </div>
    </Link>
    </div>
  );
}

export default MovieCard;