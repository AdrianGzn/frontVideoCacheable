import ReactPlayer from "react-player";
import { useState, useEffect } from "react";

const cacheName = "video-cache";
const apiUrl = "http://localhost:3000/api/videos";

function SeeVideo() {
  const [videoSrc, setVideoSrc] = useState("");
  const [isCached, setIsCached] = useState(false);

  useEffect(() => {
    const cacheVideo = async () => {
      try {
        const cache = await caches.open(cacheName);
        const cachedResponse = await cache.match(apiUrl);

        if (!cachedResponse) {
          console.log("Video no encontrado en caché, descargando...");
          const response = await fetch(apiUrl);
          if (response.ok) {
            const data = await response.json();

            if (data.length > 0) {
            const firstVideoUrl = data[0]
              console.log("URL del primer video:", firstVideoUrl);

              // Guardar en caché
              await cache.put(apiUrl, new Response(JSON.stringify(data)));
              
              setVideoSrc(firstVideoUrl);
              setIsCached(true);
            } else {
              console.error("No hay videos disponibles en la API");
            }
          } else {
            console.error("Error al obtener videos desde la API");
          }
        } else {
          console.log("Video encontrado en caché");
          const cachedData = await cachedResponse.json();

          if (cachedData.length > 0) {
            setVideoSrc(cachedData[0].videoUrl);
            setIsCached(true);
          }
        }
      } catch (error) {
        console.error("Error al acceder a la caché:", error);
      }
    };

    cacheVideo();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
      <div className="w-full max-w-6xl bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="relative w-full aspect-video bg-black">
          {videoSrc ? (
            <ReactPlayer url={videoSrc} controls loop width="100%" height="100%" playing />
          ) : (
            <p className="text-center text-gray-400 p-6">Cargando video...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SeeVideo;
