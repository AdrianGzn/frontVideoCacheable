import ReactPlayer from "react-player";
import { useState, useEffect } from "react";

const cacheName = "video-cache";
const videoUrl = "http://localhost:3000/api/videos/public/videos";

const suggestedVideos = [
  { id: 1, title: "La Casa de Papel", thumbnail: "./public/Bob_Esponja.jpg" },
  { id: 2, title: "Dark", thumbnail: "./public/pinguinos.jpg" },
  { id: 3, title: "Narcos", thumbnail: "./public/río.jpg" },
  { id: 4, title: "Squid Game", thumbnail: "./public/Secreto.jpg" }
];

function SeeVideo() {
  const [videoSrc, setVideoSrc] = useState(videoUrl);
  const [isCached, setIsCached] = useState(false);

  useEffect(() => {
    const obtenerElVideo = async () => {
      try {
        const cache = await caches.open(cacheName);
        const response = await fetch("http://localhost:3000/api/videos",  {
            method: "GET"
        });
        if (response.ok) {
            console.log("reponse", response)
          await cache.put(videoUrl, response.clone());
          console.log("Video guardado en caché");
        } else {
          console.log("No se pudo obtener el video");
        }
      } catch (error) {
        console.log("Error al guardar en caché:", error);
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
        const objectURL = URL.createObjectURL(blob);
        setVideoSrc(objectURL);
        setIsCached(true);
        console.log("Video desde la caché");
      } else {
        console.log("No hay videos en el caché");
        setIsCached(false);
      }
    } catch (error) {
      console.log("Error en el caché:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
      {/* Contenedor principal */}
      <div className="w-full max-w-6xl bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
        {/* Sección del reproductor */}
        <div className="relative w-full aspect-video bg-black">
          <ReactPlayer
            url={videoSrc}
            controls
            loop
            width="100%"
            height="100%"
            className="absolute top-0 left-0"
            playing
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
        </div>

        {/* Controles debajo del video */}
        <div className="p-6 flex flex-col items-center space-y-6">
          <button 
            className={`px-6 py-3 rounded-lg font-bold text-lg transition-all duration-300 flex items-center space-x-2 ${
              isCached 
                ? 'bg-green-600 hover:bg-green-700 shadow-green-glow'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
            onClick={ReproducirVideo}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={isCached ? "M5 13l4 4L19 7" : "M12 15l8-8m0 0h-6m6 0v6"} 
              />
            </svg>
            <span>
              {isCached ? 'Reproduciendo desde caché' : 'Cargar desde memoria'}
            </span>
          </button>

          {/* Sección de estado */}
          <div className="w-full bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Estado del caché:</span>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                isCached ? 'bg-green-900 text-green-200' : 'bg-yellow-900 text-yellow-200'
              }`}>
                {isCached ? 'Disponible' : 'No disponible'}
              </span>
            </div>
          </div>
        </div>

        {/* Sección de sugerencias */}
        <div className="border-t border-gray-700 p-6">
          <h3 className="text-xl font-bold mb-4">Sugerencias para ti</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {suggestedVideos.map((video) => (
              <div 
                key={video.id} 
                className="bg-gray-700/50 hover:bg-gray-700 transition rounded-lg overflow-hidden cursor-pointer group"
              >
                <div className="aspect-video bg-gray-600/30 relative overflow-hidden">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-3">
                  <h4 className="font-medium text-white group-hover:text-blue-400 transition-colors">
                    {video.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeeVideo;