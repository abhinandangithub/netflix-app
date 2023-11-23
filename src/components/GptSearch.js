import React from "react";
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestions from './GptMovieSuggestions';
import {BG_URL} from '../utils/constant';

const GptSearch = () => {
  return <div>
    <>
        <div className='absolute -z-10 md:fixed'>
            <img
            className="w-screen h-screen object-cover aspect-video "
            src={BG_URL}
            alt="" />
        </div>
        <div className="">
            <GptSearchBar/>
            <GptMovieSuggestions/>
        </div>
        </>
  </div>;
};

export default GptSearch;