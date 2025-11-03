import React from "react";
import { getTopRatedTVShows, getPopularTVShows, getTrendingTV } from "../../api/tmdbApi";
import  Movierow  from "../Movierow.jsx";

function TVShows() {
return (
    <div className="home-page" style={{paddingTop: '2rem'}}>
        <Movierow title="Popular TV Shows" fetchFunction={getPopularTVShows} defaultType="tv" />
        <Movierow title="Top Rated TV Shows" fetchFunction={getTopRatedTVShows} defaultType="tv" />
        <Movierow title="Trending TV Shows" fetchFunction={getTrendingTV} defaultType="tv" />
    </div>
);
}

export default TVShows;