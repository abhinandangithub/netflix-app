import React from "react";
import useMovieTrailerHook  from "../hooks/useMovieTrailer"
import { useSelector } from "react-redux";

const VideoBackground = ({id}) => {
  const trailer = useSelector((store => store.movies?.trailerVideo));

  useMovieTrailerHook(id)

  return (<div>
    { trailer && <iframe className="w-screen aspect-video"  src={`https://www.youtube.com/embed/X4d_v-HyR4o?si=${trailer.key}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>}
  </div>);
};

export default VideoBackground;
