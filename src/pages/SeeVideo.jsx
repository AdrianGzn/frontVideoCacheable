import ReactPlayer from "react-player";
import { useState, useEffect } from "react";
import { videos } from "../data/videos";

const cacheName = "video-cache";
const apiUrl = "http://localhost:3000/api/videos";

function SeeVideo() {
  const [videoSrc, setVideoSrc] = useState("");
  const [isCached, setIsCached] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let objectUrl = "";

    const cacheVideo = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("No se pudo obtener la lista de videos");
        const videoList = await response.json();

        if (!Array.isArray(videoList.videos) || videoList.videos.length === 0) {
          throw new Error("La API no retornó videos");
        }

        console.log("videos", videoList.videos[0]);
        const videoUrl = videoList.videos[0]; // Usamos el primero por ahora

        const cache = await caches.open(cacheName);
        const cachedResponse = await cache.match(videoUrl);

        if (cachedResponse) {
          console.log("🎬 Video encontrado en caché");
          const blob = await cachedResponse.blob();
          objectUrl = URL.createObjectURL(blob);
          setVideoSrc(objectUrl);
          setIsCached(true);
        } else {
          console.log("📥 Descargando y guardando video en caché...");
          const videoResponse = await fetch(apiUrl);
          if (!videoResponse.ok) throw new Error("No se pudo descargar el video");

          await cache.put(apiUrl, videoResponse.clone());
          const blob = await videoResponse.blob();
          objectUrl = URL.createObjectURL(blob);
          setVideoSrc(objectUrl);
          setIsCached(false);
        }
      } catch (err) {
        console.error(err);
        setError("Error al cargar el video");
      } finally {
        setLoading(false);
      }
    };

    cacheVideo();

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-gray-800 rounded-xl shadow-xl overflow-hidden">
        <div className="aspect-video bg-black relative">
          {loading ? (
            <p className="text-center text-gray-400 p-6">Cargando video...</p>
          ) : error ? (
            <p className="text-center text-red-400 p-6">{error}</p>
          ) : videoSrc ? (
            <ReactPlayer
              url={"http://localhost:3000/videos/yt1z.net - The Avengers Los Vengadores - Tráiler Oficial - Doblado (720p).mp4"}
              controls
              width="100%"
              height="100%"
              playing
            />
          ) : (
            <p className="text-center text-gray-400 p-6">No se pudo cargar el video.</p>
          )}
        </div>
        {!loading && !error && (
          <p className="text-center text-sm text-gray-400 mt-2">
            {isCached ? "✅ Video desde caché" : "🌐 Video desde red"}
          </p>
        )}
      </div>
      <div id="videos-container" className="mt-8">
        <div id="title-container" className="text-center mb-6">
          <p className="text-lg text-white font-semibold">Videos recomendados</p>
        </div>
        <div id="video" className="flex justify-center space-x-6 gap-10">
          {/* videos map */}
          {
            videos.map((item, index) => (
              <div key={index} className="relative group">
                <img
                  src={item.image}
                  alt={`Video ${index}`}
                  className="w-56 h-36 object-cover rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-50 rounded-lg transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xl font-semibold">Reproducir</span>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default SeeVideo;
