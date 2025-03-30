import ".././App.css";
import React from "react";
import ReactPlayer from "react-player";
import { useState, useEffect } from "react";
import { videos } from "../data/videos";

function SeeVideo() {
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
    }, [])

    const getDirection = (urlVideo) => {
        const url = baseUrl + urlVideo
        console.log(url)
        setUrl(url)
    }

    return (
        <div id="main">
            <div id="main-video">
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
            <div id="videos-container">
                {
                    videos.map((item) => (
                        <div className="border 1px solid  red">
                            <div>
                                <img src={item.image} className="video-image">
                                </img>
                                <p>
                                    {item.name}
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default SeeVideo;