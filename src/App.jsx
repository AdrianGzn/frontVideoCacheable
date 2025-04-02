import ReactPlayer from "react-player";
import { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SeeVideo from "./pages/SeeVideo";
const cacheName = "video-cache";
const videoUrl = "https://www.youtube.com/watch?v=MxjCLqdk4G4";
function App() {

  return (
    <>
    <SeeVideo/>
    </>
  );
}

export default App;