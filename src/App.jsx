import "./App.css";
import ReactPlayer from "react-player";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([])
  const [url, setUrl] = useState("")
  const baseUrl = "http://localhost:3000/videos/"

  useEffect(() => {
    fetch("http://localhost:3000/api/videos", {
      method: "GET",

      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => response.json()
      )
      .then((data) => {
        console.log(data.videos)
        setData(data.videos)
      })
      .catch((err) => {
        console.log("error:", err)
      })
      .finally((final) => {
        console.log(final)
      })
  }, [])

  const getDirection = (urlVideo) => {
    const url = baseUrl + urlVideo
    console.log(url)
    setUrl(url)
  }

  return (
    <div className="border-2 border-black p-5">
      {
        data.map((video, id) => (
          <li key={id}>
            <button onClick={(() => getDirection(video))}>
              Reproducir video
            </button>
          </li>
        ))
      }

      {
        url && (
          <ReactPlayer url={url} controls loop className="border-2 border-white" />
        )
      }

    </div>
  );
}

export default App;