import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
// Path dhyan se dekhna, ab hum ek folder upar jaa rahe hain
import Home from "./pages/Home.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import Search from "./pages/Search.jsx";
import TVShowDetails from "./pages/TVShowDetails.jsx";
import Movies from "./pages/Movies.jsx";
import Anime from "./pages/Anime.jsx";
import TVShows from "./pages/TVShows.jsx";

import './Layout.css';

function Layout() {
  return (
    <div className="layout">
      {/* Header har page par dikhega */}
      <Header />
      
      {/* Pages yahan badalte rahenge */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/search/:query" element={<Search/>} />
        <Route path="/tv/:id" element={<TVShowDetails />} />
        <Route path="movies" element={<Movies />} />
        <Route path="anime" element={<Anime />} />
        <Route path="tv" element={<TVShows />} />
      </Routes>

      {/* Jab hum future me Footer banayenge, to use bhi yahin add kar denge */}
    </div>
  );
}

export default Layout;