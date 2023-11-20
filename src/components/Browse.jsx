import React from 'react'
import Header from './Header';
import useNowPlayingMovieHook from '../hooks/nowPlayingMoviesHook';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';

const Browse = () => {
  
  useNowPlayingMovieHook();

  return (
    <div>
      <Header />
      <MainContainer/>
      <SecondaryContainer/>
    </div>
  )
}

export default Browse