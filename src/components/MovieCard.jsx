// src/components/MovieCard.jsx
import React from 'react';
import './MovieCard.css'; // CSS import ki
import { Link } from 'react-router-dom';

// Ye TMDB ki taraf se di gayi image URL hai
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

function MovieCard({ movie }) {
  const imageUrl = `${IMAGE_BASE_URL}${movie.poster_path}`;

  return (
    // 1. Dekho, humne wrapper <div> HATA diya.
    // 2. Humne Link component ko hi seedhe "movie-card" class de di.
    <Link to={`/movie/${movie.id}`} className="movie-card">
      {/* Ab humein "movie-link" class ki zaroorat nahi hai */}
      <img src={imageUrl} alt={movie.title} />
      <div className="movie-info">
        <h3>{movie.title}</h3>
      </div>
    </Link>
  );
}

export default MovieCard;