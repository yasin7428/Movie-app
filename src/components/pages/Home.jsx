// src/components/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { getTrendingMovies } from "../../api/tmdbApi"; // Apni helper file import ki
import MovieCard from "../MovieCard";
import "./Home.css"; // CSS import ki


function Home() {
  // 3 states: data, loading, aur error ke liye
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Ye function data fetch karega
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await getTrendingMovies();
        console.log(data);
        setMovies(data.results); // API se mile results ko state me save kiya
        setError(null);
      } catch (err) {
        setError(`Failed to fetch movies. Please try again later. Error: ${err.message}`);
      } finally {
        setLoading(false); // Chahe error aaye ya data, loading band kar do
      }
    };

    fetchMovies(); // Function ko call kiya
  }, []); // [] khaali array ka matlab hai: "ye useEffect sirf ek baar chalao jab component load ho"

  return (
    <div style={{ padding: "20px" }}>
      <h2>Trending Movies</h2>

      {/* Conditional Rendering */}
      {loading && <p>Loading movies...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="movie-grid">
        {movies.map((movie) => (
          // Har movie ke liye ab <li> nahi, <MovieCard> banega
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Home;
