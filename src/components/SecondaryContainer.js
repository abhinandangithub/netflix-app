import React from "react";
import MovieList from './MovieList';
import {useSelector} from 'react-redux';

const SecondaryContainer = () => {
  const movies = useSelector(store => store.movies);
  console.log(movies)
    if(movies === null) return;
  return <div className="bg-black">
    <div className="-mt-[20%] relative z-20">
      <MovieList title="Now Playing" movies={movies?.nowPlayingMovies}/>
      <MovieList title="Popular" movies={movies?.popularMovies}/>
      <MovieList title="Comedy" movies={movies?.nowPlayingMovies}/>
      <MovieList title="Trendindg" movies={movies?.nowPlayingMovies}/>
    </div>
  </div>;
};

export default SecondaryContainer;
