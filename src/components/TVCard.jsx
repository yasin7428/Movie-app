// src/components/TVCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css'; // <-- Hum MovieCard wali CSS hi use kar lenge!

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Yahan hum prop ka naam 'show' rakh lete hain (movie ki jagah)
function TVCard({ show }) {
  
  const imageUrl = `${IMAGE_BASE_URL}${show.poster_path}`;

  return (
    // 1. BADLAAV: Link "/tv/" se shuru hoga
    <Link to={`/tv/${show.id}`} className="movie-card">
      <img src={imageUrl} alt={show.name} />
      <div className="movie-info">
        {/* 2. BADLAAV: 'show.name' (show.title nahi) */}
        <h3>{show.name}</h3>
      </div>
    </Link>
  );
}

export default TVCard;