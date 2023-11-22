import React from "react";

function VideoTitle({title, overview}) {
  return (<div className="pt-[15%] px-[5%] absolute text-white bg-gradient-to-r from-black w-screen aspect-video">
    <h1 className="text-6xl font-bold">{title}</h1>
    <p className="py-6 text-lg w-1/2">{overview}</p>
    <div className="flex gap-10">
      <button className="bg-gray-500 text-black bg-white p-4 px-10 text-lg rounded-lg hover:bg-opacity-80">Play</button>
      <button className="bg-gray-500 text-white p-4 px-10 text-lg bg-opacity-50 rounded-lg hover:bg-opacity-80">More Info</button>
    </div>
  </div>);
}

export default VideoTitle;
