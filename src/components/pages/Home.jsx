// src/components/pages/Home.jsx

import { 
  getTrendingMovies,
  getTrendingTV,
  getTopActionMovies,
  getTrendingAnime
} from "../../api/tmdbApi"; // Apni helper file import ki
import MovieCard from "../MovieCard";
import Movierow from "../Movierow";
import "./Home.css"; // CSS import ki


function Home() {

  return (
    <div className="home-page" style={{ paddingTop: '2rem' }}>
      <Movierow title="Trending Movies" fetchFunction={getTrendingMovies} />
      <Movierow title="Trending TV Shows" fetchFunction={getTrendingTV} />
      <Movierow title="Top Action Movies" fetchFunction={getTopActionMovies} /> 
      <Movierow title="Trending Anime" fetchFunction={getTrendingAnime} />
    </div>
  );
}

export default Home;
