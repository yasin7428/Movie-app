import React from "react";
import { getPopularMovies, getTopRatedMovies, getTopActionMovies } from "../../api/tmdbApi";
import  Movierow  from "../Movierow.jsx";

function Movies() {
return (
    <div className="home-page" style={{paddingTop: '2rem'}}>
        <Movierow title="Popular Movies" fetchFunction={getPopularMovies} defaultType="movie" />
        <Movierow title="Top Rated Movies" fetchFunction={getTopRatedMovies} defaultType="movie" />
        <Movierow title="Action Movies" fetchFunction={getTopActionMovies} defaultType="movie" />
    </div>
);
}

export default Movies;