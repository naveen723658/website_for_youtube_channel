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
import Topheader from "./Topheader";
const Allvideos = () => {
  const [videos, setVideos] = useState([]);
  const [pageToken, setPageToken] = useState([]);
  const [Token, setToken] = useState("None");
  const [hasMore, setHasMore] = useState(true);
  const PageToken = (mytoken) => {
    setPageToken(mytoken);
  };
  const getChannelVideos = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/channel_videos/${pageToken}`
      );
      const { items, nextPageToken } = response.data;
      setVideos([...videos, ...items]);
      setToken(nextPageToken);
      if (!nextPageToken) {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [pageToken, setVideos, setPageToken]);
  useEffect(() => {
    getChannelVideos();
  }, [pageToken]);
  return (
    <>
      <Topheader title="All Videos" subtitle="All Videos" />

      <section>
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
        {Token && (
          <div className="d-flex py-4 my-2 justify-content-center">
            <button className="btn btn-danger" onClick={() => PageToken(Token)}>
              Load More
            </button>
          </div>
        )}
      </section>
    </>
  );
};
export default Allvideos;
