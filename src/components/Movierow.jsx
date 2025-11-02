import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import TVCard from "./TVCard";
import "./Movierow.css";

function Movierow({ title, fetchFunction }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const data = await fetchFunction();
        setResults(data.results);
        setError(null);
      } catch (err) {
        setError(
          `Failed to fetch movies. Please try again later. Error: ${err.message}`
        );
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, [fetchFunction]);

  return (
    <div className="movie-row">
      <h2 className="movie-row-title">{title}</h2>
      {loading && <p>Loading movies...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="movie-list">
        {results.map((result) => {
          if (result.media_type === "movie" || !result.media_type) {
            return <MovieCard key={result.id} movie={result} />;
          } else if (result.media_type === "tv") {
            return <TVCard key={result.id} show={result} />;
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default Movierow;
