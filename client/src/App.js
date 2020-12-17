import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
// import axios from "axios";
import "./App.css";

const API = process.env.REACT_APP_API_KEY;
// const channelID = "UCkoKQQCrH9dh4wvzdOzmooQ";
const testList = "PLRlU_Ewkdx26QGgMj9QieC0ZDeN27Zl5S";
// const finalURL = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=${channelID}&key=${API}`;
const playURL = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&playlistId=${testList}&key=${API}`;

//! Currently shows a random vid on refresh
//TODO - Make the videos go to the next when finished

function App() {
  // Hooks
  let [response, setResponse] = useState([]);
  let [count, setCount] = useState(0);

  const shuffle = (array) => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  // API call

  useEffect(() => {
    fetch(playURL)
      .then((res) => res.json())
      .then((res) => {
        let videoURLs = [];

        res.items.forEach((element) => {
          videoURLs.push(element.snippet.resourceId.videoId);
        });

        shuffle(videoURLs);
        console.log(videoURLs);

        // console.log(videoURLs);

        // const min = 0;
        // const max = videoURLs.length - 1;

        // const getRandomNum = (min, max) => {
        //   return Math.floor(Math.random() * (max - min) + min);
        // };

        // console.log(getRandomNum(min, max), max);
        setResponse(
          JSON.stringify(videoURLs[count], null, "\t").replace(/"/g, "")
        );
      });
  }, []);

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const _onReady = (e) => {
    // access to player in all event handlers via event.target
    e.target.pauseVideo();
  };

  // console.log(`https://www.youtube.com/embed/${response.replace(/"/g, "")}`);

  return (
    <div className="App">
      <YouTube
        videoId={`${response}`}
        opts={opts}
        onReady={_onReady}
        onEnd={() => {
          console.log("vid ended");
        }}
      />
      {/* <iframe
    //     width="640"
    //     height="390"
    //     title="video"
    //     allowFullScreen
    //     src={`https://www.youtube.com/embed/${response}`}
    //   /> */}
      {/* <pre>
        <code>{response}</code>
      </pre> */}
    </div>
  );
}

export default App;
