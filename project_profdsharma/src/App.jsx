import react, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Latest from "./components/Latest";
import axios from "axios";
import Video from "./components/Video";
import Category from "./components/Category";
function App() {
  const [latestVideos, setLatestVideos] = useState([]);
  const [playlistsData, setPlaylistsData] = useState([]);
  const [Playlist, setPlaylist] = useState([]);
  const fetchData = async () => {
    const latestUploads = await axios.get(
      'http://127.0.0.1:8000/latest_videos/'
    );
    setLatestVideos(latestUploads.data);
    
    const playlists = await axios.get(
      'http://127.0.0.1:8000/playlists/'
    );
    setPlaylist(playlists.data.items);
    let data = [];
    for (let i = 0; i < playlists.data.items.length; i++) {
      const id = playlists.data.items[i].id;
      const title = playlists.data.items[i].snippet.title;
      const videos = await axios.get(
        `http://127.0.0.1:8000/playlist_items/${id}/${4}`
      );

      const videoIds = videos.data.items.map(item => item.snippet.resourceId.videoId);
      const statistics = await axios.get(
        `http://127.0.0.1:8000/video_statistics/${videoIds.join(',')}`
      );
      videos.data.items.forEach((item, index) => {
        item.statistics = statistics.data.items[index].statistics;
      });

      if (videos.data.items.length >= 4) {
        let items = videos.data.items
        data.push({ title: title, items: items, playlistsId: id });
      }
    }
    setPlaylistsData(data);
  };
  useEffect(() => {
    fetchData();
  }, [ ]);
  
 
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={[
              <Hero herodata={latestVideos} />,
              <Latest youtubedata={playlistsData} />,
              <Category playlistitem={Playlist} />,
            ]}
          />
          <Route
            path="/about/:videoId/:playlistId"
            element={[
                <Video/>,
            ]}
          />
          
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
