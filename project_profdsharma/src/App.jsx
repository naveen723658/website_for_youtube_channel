import react, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Latest from "./components/Latest";
import axios from "axios";
import Video from "./components/Video";
import Allvideos from "./components/Allvideos";
import Category from "./components/Category";
import StickyIcons from "./components/StickyIcons";
import Priorty from "./components/Priorty";
import Stats from "./components/Stats";
import Contact from "./components/Contact";
import About from "./components/About";
import Recent from "./components/Recent";
import Stotra from "./components/Stotra";
import Public from "./components/Public";
import Live from "./components/Live";
import Seminar from "./components/Seminar";
import Frontvideo from "./components/Frontvideo";
import Detailvideo from "./components/Detailvideo";
function App() {
  const [latestVideos, setLatestVideos] = useState([]);
  const [playlistsData, setPlaylistsData] = useState([]);
  const [Playlist, setPlaylist] = useState([]);
  // const fetchData = async () => {
  //   const latestUploads = await axios.get(
  //     'http://127.0.0.1:8000/latest_videos/'
  //   );
  //   setLatestVideos(latestUploads.data);
    
  //   const playlists = await axios.get(
  //     'http://127.0.0.1:8000/playlists/'
  //   );
  //   setPlaylist(playlists.data.items);

  // };
  // useEffect(() => {
  //   fetchData();
  // }, [ ]);
  
 
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <StickyIcons/>
        <Routes>
          <Route
            path="/"
            element={[
              <Hero herodata={latestVideos} />,
              <Frontvideo/>,
              <Recent/>,
              <Latest />,
              <Stats/>,
              <Category />,
              <Live />
            ]}
          />
          <Route
            path="/about/:videoId/"
            element={[
                <Video/>,
            ]}
          />
          <Route
            path="/video-detail"
            element={[
                <Detailvideo/>,
            ]}
          />

          <Route path="/about_us" element = {[<About/>]} />
          <Route path="/Contact" element = {[<Contact/>]} />
          <Route path="/allvideos" element = {[<Allvideos/>]} />
          <Route path="/stotra-and-stuti" element = {[<Stotra/>]} />
          <Route path="/public-opinion" element = {[<Public/>]} />
          <Route path="/seminar" element = {[<Seminar/>]} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
