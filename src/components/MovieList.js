import React from "react";
import MovieCard from './MovieCard';

const MovieList = ({title , movies}) => {
    console.log(title , movies)
  return (<div className="p-6">
        <h1 className="text-3xl bold py-2 text-white">
            {title}
        </h1>
        <div className="flex overflow-x-scroll">
            <div className="flex gap-5">
                {movies && movies.map(m => <MovieCard key={m.id} posterPath={m.poster_path}/>)}
            </div>
        </div>
    </div>
  );
};

export default MovieList;
