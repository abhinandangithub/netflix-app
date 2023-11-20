import  {useEffect} from 'react'
import {API_OPTIONS} from '../utils/constant';
import {useDispatch} from 'react-redux';
import {addTrailerVideo} from '../utils/moviesSlice';

const useMovieTrailerHook = (id) => {
  console.log('id ', id)
  const dispatch = useDispatch();

  const getMovie = async (id) => {
    const data = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, API_OPTIONS)
    const json = await data.json();
    const trailer = json.results.find(m =>  m.type === "Trailer")
    console.log(trailer)
    dispatch(addTrailerVideo(trailer || json.results[0]))
  }

  useEffect(() => {
     getMovie(id);
  }, []);
}

export default useMovieTrailerHook;
