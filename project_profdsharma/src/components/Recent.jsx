import {
  FaAngleRight,
  FaUser,
  FaBook,
  FaEye,
  FaComments,
  FaHeart,
} from "react-icons/fa";
import axios from "axios";
import react, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
const Recent = () => {
  const [videos, setVideos] = useState([]);
  const getChannelVideos = useCallback(async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/channel_videos/`);
      //   console.log(response.data.items.slice(0, 4));
      setVideos(response.data.items.slice(1, 5));
    } catch (error) {
      console.log(error);
    }
  }, [setVideos]);
  useEffect(() => {
    getChannelVideos();
  }, []);
    // console.log(videos);
  return (
    <>
      <div className="py-4 container-fluid">
        <div className="container">
          <div className="d-flex justify-content-between no-margin video-title  align-item-center">
            <h6 className="d-flex align-item-center center justify-content-center">
              <span className="mr-2">
                <FaBook />{" "}
              </span>
              Recent Uploads
            </h6>
            <Link to="/allvideos" className="btn btn-danger">
              View More
            </Link>
          </div>
          <div className="video-row row justify-content-center">
            {videos && (
              <div className="py-4 container-fluid">
                <div className="container">
                  <div className="video-row row  justify-content-center">
                    {videos.map((data, index) => (
                      <div
                        className="col-lg-3 col-md-4 col-sm-6 mycard p-2"
                        key={index}
                      >
                        <Link to={`/about/${data.id.videoId}`} key={index}>
                          <div className="video-card">
                            
                            <img
                              src={data.snippet.thumbnails.medium.url}
                              alt="thumbnail"
                            />
                            <div className="row details no-margin">
                              <h6>{data.snippet.title}</h6>
                            </div>
                          </div>
                        </Link>
                        <div className="bottom-card ">
                          <div className="left">
                            <div>
                            <span className="mr-2 my-auto">
                              <FaEye />
                            </span>
                            <span>
                              {data.statistics &&
                                data.statistics.statistics.viewCount}
                            </span>
                            </div>
                           
                          </div>
                          <div className="right">
                            <div>
                            <span className="mr-2 my-auto">
                              <FaHeart />
                             
                            </span>
                            <span>
                              {data.statistics &&
                                data.statistics.statistics.likeCount}
                            </span>
                            </div>
                            <div>
                            <span className="mr-2 my-auto">
                              <FaComments />
                            </span>
                            <span>
                              {data.statistics &&
                                data.statistics.statistics.commentCount}
                            </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Recent;
