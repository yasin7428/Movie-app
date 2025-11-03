import React from "react";
import { getTopRatedAnime, getPopularAnime, getTrendingAnime, getTopAnimeSeries, getActionAnimeSeries } from "../../api/tmdbApi";
import  Movierow  from "../Movierow.jsx";

function Anime() {
return (
    <div className="home-page" style={{paddingTop: '2rem'}}>
        <Movierow title="   Popular Anime" fetchFunction={getPopularAnime} defaultType="movie" />   
        <Movierow title="   Top Rated Anime" fetchFunction={getTopRatedAnime} defaultType="movie" />
        <Movierow title="   Trending Anime" fetchFunction={getTrendingAnime} defaultType="movie" />
        <Movierow title="   Top Anime Series" fetchFunction={getTopAnimeSeries} defaultType="tv" />
        <Movierow title="   Action Anime Series" fetchFunction={getActionAnimeSeries} defaultType="tv" />
    </div>
);
}

export default Anime;
