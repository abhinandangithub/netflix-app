import React from "react";
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestions from './GptMovieSuggestions';
import {BG_URL} from '../utils/constant';

const GptSearch = () => {
  return <div>
        <div className='fixed -z-10'>
            <img
            className="w-screen aspect-video"
            src={BG_URL}
            alt="" />
        </div>
        <GptSearchBar/>
        <GptMovieSuggestions/>
  </div>;
};

export default GptSearch;