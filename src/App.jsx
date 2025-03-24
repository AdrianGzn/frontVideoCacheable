import "./App.css";
import ReactPlayer from "react-player";
import { useState, useEffect } from "react";

const cacheName = "video-cache";
const videoUrl = "https://www.youtube.com/watch?v=MxjCLqdk4G4";

function App() {
  const [videoSrc, setVideoSrc] = useState(videoUrl);

  useEffect(() => {
    const obtenerElVideo = async () => {
      try {
        const cache = await caches.open(cacheName);
        const response = await fetch(videoUrl);
        if (response.ok) {
          await cache.put(videoUrl, response.clone());
          console.log("Video guardado en el foking caché");
        } else {
          console.log("Esta mmda no es un video");
        }
      } catch (error) {
        console.log("Falló el try");
      }
    };

    obtenerElVideo();
  }, []);

  const ReproducirVideo = async () => {
    try {
      const cache = await caches.open(cacheName);
      const response = await cache.match(videoUrl);
      if (response) {
        const blob = await response.blob();
        const objectURL = URL.createObjectURL(blob);  //aquí se 'instancia'
        setVideoSrc(objectURL);
        console.log("Video desde la caché");
      } else {
        console.log("No hay videos en el caché wey");
      }
    } catch (error) {
      console.log("Error en el caché:", error);
    }
  };

  return (
    <div className="border-2 border-black p-5">
      <ReactPlayer url={videoSrc} controls loop className="border-2 border-white" />
      <button className="m-2" onClick={ReproducirVideo}>Cargar desde la memoria</button>
    </div>
  );
}

export default App;