import React from "react";
import { useParams } from "react-router-dom";
import {
  getMovieDetails,
  getMovieCredits,
  BACKDROP_BASE_URL,
  getSimilarMovies,
} from "../../api/tmdbApi";
import { useEffect, useState } from "react";
import "./MovieDetails.css";
import  MovieCard from "../MovieCard.jsx"


const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieDetails() {
  const useparams = useParams();
  const movieId = useparams.id;
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const moviePromise = getMovieDetails(movieId);
        const castPromise = getMovieCredits(movieId);
        const similarMoviesPromise = getSimilarMovies(movieId);
        const [movieData, castData, similarMoviesData] = await Promise.all([
          moviePromise,
          castPromise,
          similarMoviesPromise,
        ]);
        setCast(castData.cast);
        setMovie(movieData);
        setSimilarMovies(similarMoviesData.results);
      } catch (error) {
        setError(`Movie not found ${error}`);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return <div className="loading-error">Loading...</div>;
  }

  if (error) {
    return <div className="loading-error error">{error}</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  const posterUrl = `${POSTER_BASE_URL}${movie.poster_path}`;
  const backdropUrl = `${BACKDROP_BASE_URL}${movie.backdrop_path}`;

  return (
    
    <div className="details-page-container"
      style={{ backgroundImage: `url(${backdropUrl})` }}
    >
      <div className="backdrop-overlay">
        <div className="details-content">
          <img
            className="details-poster"
            src={posterUrl}
            alt={movie.title}
            style={{ width: "300px", borderRadius: "10px" }}
          />
          <div className="details-info">
            <h1>{movie.title}</h1>
            <p>
              <strong>Release Date:</strong>
              {movie.release_date}
            </p>
            <p>
              <strong>Rating:</strong> {movie.vote_average.toFixed(1)}/10
            </p>
            <h2>Overview</h2>
            <p>{movie.overview}</p>
          </div>
          <div className="cast-section">
            <h2>Top Cast</h2>
            <div className="cast-list">
              {cast.slice(0, 10).map((actor) => (
                <div key={actor.id} className="cast-member">
                  <img
                    src={`${POSTER_BASE_URL}${actor.profile_path}`}
                    alt={actor.name}
                  />
                  <p>{actor.name}</p>
                  <p className="character-name">: {actor.character}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="similar-section">
            <h2>Similar Movies</h2>
            <div className="similar-list">
              {similarMovies.slice(0, 10).map((similarMovie) => (
                <MovieCard key={similarMovie.id} movie={similarMovie} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MovieDetails;
