// src/components/pages/Search.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // URL se query nikaalne ke liye
import { searchMovies } from '../../api/tmdbApi'; // Search function import kiya
import MovieCard from '../MovieCard'; // Wahi card component use karenge
import './Home.css'; // Wahi CSS file use karenge grid ke liye

function Search() {
  // 1. useParams se URL me se :query ko pakda
  const useparams = useParams();
  const query = useparams.query;
  
  // 2. States banaye data, loading, aur error ke liye
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 3. Ye function search query ke basis par data fetch karega
    const fetchSearchedMovies = async () => {
      try {
        setLoading(true);
        const data = await searchMovies(query);
        setMovies(data.results); // Search results ko state me save kiya
        setError(null);
      } catch (err) {
        setError(`Failed to fetch movies. Please try again later. Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchedMovies();
  }, [query]); // <-- Yahan [query] zaroori hai. Matlab: "Jab bhi search query badle, ye function dobara chalao"

  // 4. Conditional Rendering
  if (loading) return <p style={{ padding: '20px' }}>Loading search results...</p>;
  if (error) return <p style={{ padding: '20px', color: 'red' }}>{error}</p>;

  // 5. Jab data aa jaye, to UI dikhao
  return (
    <div className="home-page" style={{ padding: '20px' }}>
      <h2>Search Results for: "{query}"</h2>
      
      {/* Agar koi result na mile to message dikhao */}
      {movies.length === 0 && (
        <p>No movies found for this search.</p>
      )}

      {/* Wahi movie grid jo homepage par hai */}
      <div className="movie-grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie}/>
        ))}
      </div>
    </div>
  );
}

export default Search;