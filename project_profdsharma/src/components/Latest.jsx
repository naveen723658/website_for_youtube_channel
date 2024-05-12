import react, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaEye,
  FaComments,
  FaAngleRight,
  FaUser,
  FaBook,
  FaHeart,
} from "react-icons/fa";
import axios from "axios";
const Latest = () => {
  const api = import.meta.env.VITE_BACKEND_URL;
  const [youtubedata, setYoutubedata] = useState([]);
  useEffect(() => {
    axios
      .get(`${api}/combine_data/`)
      .then((res) => {
        // console.log(res.data)
        setYoutubedata(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setYoutubedata]);
  return (
    <>
      {youtubedata.playlists &&
        youtubedata.playlists.items
          .filter((item) => item.contentDetails.itemCount >= 4)
          .map((item, index) => (
            <>
              <div
                className={`py-4 container-fluid ${
                  index % 2 === 0 ? "bg-light" : "bg-white"
                }`}
                index={index}
              >
                <div className="container">
                  <div className="d-flex justify-content-between no-margin video-title  align-item-center">
                    <h6 className="d-flex align-item-center center justify-content-center">
                      <span className="mr-2">
                        <FaBook />{" "}
                      </span>
                      {item.snippet.title}
                    </h6>
                    <Link to="/allvideos" className="btn btn-danger">
                      View More
                    </Link>
                  </div>
                  <div className="video-row row justify-content-center">
                    {youtubedata.playlistsitems && (
                      <div className="py-4 container-fluid">
                        <div className="container">
                          <div className="video-row row  justify-content-center">
                            {youtubedata.playlistsitems
                              .filter(
                                (data) => item.id === data.snippet.playlistId
                              )
                              .map((data, index) => (
                                <div
                                  className="col-lg-3 col-md-4 col-sm-6 mycard p-2"
                                  key={index}
                                >
                                  <Link
                                    to={`/about/${data.snippet.resourceId.videoId}`}
                                    key={index}
                                  >
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
                                            data.statistics.statistics
                                              .viewCount}
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
                                            data.statistics.statistics
                                              .likeCount}
                                        </span>
                                      </div>
                                      <div>
                                        <span className="mr-2 my-auto">
                                          <FaComments />
                                        </span>
                                        <span>
                                          {data.statistics &&
                                            data.statistics.statistics
                                              .commentCount}
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
          ))}
    </>
  );
};
export default Latest;
