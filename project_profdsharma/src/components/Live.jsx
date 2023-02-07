import React, { useState, useEffect } from "react";
import axios from "axios";

// http://127.0.0.1:8000/live

const Live = () => {
  const [show, setShow] = useState(true);

  const handleScroll = () => {
    if (window.pageYOffset > 400) {
      setShow(false);
    } else {
      setShow(true);
    }
  };
  const [livevideo, setLivevideo] = useState([]);
  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/live')
    .then((res) =>{
      // console.log(res.data);
      setLivevideo(res.data);
    })
    .catch((error) =>{
      console.log(error);
    });
    
  },[])
  useEffect(() =>{
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  },[handleScroll])

  return (
    <>
    {livevideo.items && livevideo.items.map((item, index) =>       <>      
      <div className={`live ${show ? "hide" : "show"}`} key={index}>
        <div className="card card-01">
          <div className="embed-responsive embed-responsive-16by9">
            <iframe
              className="embed-responsive-item"
              src={`https://www.youtube.com/embed/${item.id.videoId}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div className="card-body">
            <a href="#" className="btn btn-default text-uppercase">
              Watch Live on Youtube
            </a>
          </div>
        </div>
      </div>
      </>)
      
    }
    </>
  );
};
export default Live;
