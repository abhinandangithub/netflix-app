import React, {useRef, useState, useEffect} from "react";
import lang from '../utils/languageConstant';
import {useSelector, useDispatch} from 'react-redux';
import openai from '../utils/openai';
import { API_OPTIONS } from "../utils/constant";
import {addGptMovieResults} from '../utils/gptSlice';

const GptSearchBar = () => {
  const langKey = useSelector(state=> state.config.lang)
  // const searchText = useRef('funny indian retro movies');
  const searchText = useRef('latest kannada movies');
  const dispatch = useDispatch();

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&page=1`, API_OPTIONS)
    const json = await data.json();
    return json.results;
  }


  const handleGptSearchClick = async() => {
    const gptQuery = `Act as a Movie Recommendation system and suggest some movies for the query ${searchText.current.value}. only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadhar, Sholey, Don, KGF, OM`
    const results = await openai.chat.completions.create({
      messages: [{ role: 'user', content: gptQuery }],
      model: 'gpt-3.5-turbo',
    });
    const gptMovies = results.choices?.[0]?.message?.content.split(",");

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);
    dispatch(addGptMovieResults({movieNames: gptMovies, movieResults: tmdbResults}))
  }

  return <div className="pt-[30%] px-[5%] md:p-0 md:pt-[10%] flex justify-center">
    <form className="w-full md:w-1/2  bg-black grid grid-cols-12" onSubmit={e => e.preventDefault()}>
        <input ref={searchText} type="text" className="p-4 m-4 col-span-9" placeholder="What would you like to watch today?"/>
        <button className="px-4 py-2 m-4 bg-red-700 text-white col-span-3 rounded-lg" onClick={handleGptSearchClick}>{lang[langKey].search}</button>
    </form>
  </div>;
};

export default GptSearchBar