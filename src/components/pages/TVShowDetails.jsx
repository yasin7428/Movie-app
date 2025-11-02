import { useState, useEffect } from "react";
import { getTVShowDetails, getTVSeasonDetails } from "../../api/tmdbApi";
import { useParams } from "react-router-dom";
import "./MovieDetails.css";
import "./TVShowDetails.css";

const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w1280";

function TVShowDetails() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedseason, setSelectedSeason] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loadingEpisodes, setLoadingEpisodes] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await getTVShowDetails(id);
        setShow(data);
      } catch (err) {
        setError(`Failed to fetch TV show details. Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const handleSeasonClick = async (seasonNumber) => {
    try {
      setLoadingEpisodes(true);
      setSelectedSeason(seasonNumber);

      const data = await getTVSeasonDetails(id, seasonNumber);
      setEpisodes(data.episodes);
    } catch (err) {
      setError(`Failed to fetch episodes. Error: ${err.message}`);
    } finally {
      setLoadingEpisodes(false);
    }
  };

  if (loading) return <p className="loading-error">Loading Show Details...</p>;
  if (error) return <p className="loading-error error">{error}</p>;
  if (!show) return null;

  const posterUrl = `${POSTER_BASE_URL}${show.poster_path}`;
  const backdropUrl = `${BACKDROP_BASE_URL}${show.backdrop_path}`;

  return (
    <div
      className="details-page-container"
      style={{ backgroundImage: `url(${backdropUrl})` }}
    >
      <div className="backdrop-overlay">
        <div className="details-content">
          <img src={posterUrl} alt={show.name} className="details-poster" />
          <div className="details-info">
            <h1>{show.name}</h1>
            <p>
              <strong>First Air Date:</strong>
              {show.first_air_date}
            </p>
            <p>
              <strong>Seasons:</strong>
              {show.number_of_seasons}
            </p>
            <p>
              <strong>Rating:</strong>
              {show.vote_average.toFixed(1)}/10
            </p>
            <h2>Overview</h2>
            <p>{show.overview}</p>
          </div>
        </div>
        <div className="season-section">
          <h2>Seasons</h2>
          <div className="season-list">
            {show.seasons.map((season) => (
              <div
                key={season.id}
                className={`season-card ${
                  selectedseason === season.season_number ? "active" : ""
                }`}
                onClick={() => handleSeasonClick(season.season_number)}
              >
                <img
                  src={`${POSTER_BASE_URL}${season.poster_path}`}
                  alt={season.name}
                />
                <div className="season-info">
                  <h3>{season.name}</h3>
                  <p>Episode: {season.episode_count}</p>
                  <p>Air Date: {season.air_date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="episode-section">
          {loadingEpisodes && (
            <p className="loading-episodes">Loading episodes...</p>
          )}
          {!loadingEpisodes && episodes.length > 0 && (
            <>
              <h2>
                {episodes[0].season_number === 0
                  ? "Specials"
                  : `Season ${episodes[0].season_number}`}{" "}
                Episodes
              </h2>
              <div className="episodes-list">
                {episodes.map((episode) => (
                  <div key={episode.id} className="episode-card">
                    <img
                      src={`${POSTER_BASE_URL}${episode.still_path}`}
                      alt={episode.name}
                    />
                    <div className="episode-info">
                      <h3>{episode.episode_number}.{episode.name}</h3>
                      <p>Overview: {episode.overview}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TVShowDetails;
