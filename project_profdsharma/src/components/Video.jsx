import React from "react";
import react, { useState, useEffect, useRef } from "react";
import HtmlToReact from "html-to-react";
import { FaAngleRight, FaUser, FaBook } from "react-icons/fa";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Topheader from "./Topheader";

const Video = () => {
  const parser = new HtmlToReact.Parser();

  const parm = useParams();
  const VIDEO_ID = parm.videoId;
  const [Playlist, setPlaylist] = useState(null);
  const [playlistData, setPlaylistData] = useState([]);
  const [videodetail, setvideodetail] = useState([]);
  const [commentdata, setcommentdata] = useState([]);

  const textareaRef = useRef(null);
  const [backUp, setBackUp] = useState("Add Your Comment");
  const [showBtn, setShowBtn] = useState(false);

  const handleFocus = () => {
    setBackUp("");
    textareaRef.current.style.borderColor = "#333";
    setShowBtn(true);
  };

  const handleBlur = () => {
    setBackUp("Add Your Comment");
    textareaRef.current.style.borderColor = "#aaa";
  };

  const handleClear = (e) => {
    e.preventDefault();
    setShowBtn(false);
    textareaRef.current.value = "";
  };

  const fetchData = async () => {
    try {
      // Videos Details
      const videodetails = await axios.get(
        `http://127.0.0.1:8000/video_detail/${VIDEO_ID}`
      );
      console.log(videodetails.data);
      setvideodetail(videodetails.data.items);
      // Playlist Items
      const playlistVideos = await axios.get(
        `http://127.0.0.1:8000/playlistsitem/${VIDEO_ID}`
      );
      setPlaylistData(playlistVideos.data.items);

      // comments
      const comments = await axios.get(
        `http://127.0.0.1:8000/comments/${VIDEO_ID}/`
      );
      setcommentdata(comments.data);

      // Playlist
      const playlist = await axios.get(`http://127.0.0.1:8000/playlists/`);
      setPlaylist(playlist.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [VIDEO_ID]);

  function convertToHtml(text) {
    // Find all URLs and replace them with <a> tags
    text = text.replace(/(https?:\/\/\S+)/g, '<a href="$1">$1</a>');
    // Split the text by newline characters and wrap each line in <p> tags
    var paragraphs = text.split("\n").map(function (line) {
      return line && "<p>" + line + "</p>";
    });

    // Join the paragraphs together and return the final HTML
    return paragraphs.join("\n");
  }

  return (
    <>
      {videodetail[0] && (
        <>
          <Topheader title={videodetail[0].snippet.title} subtitle="About" />
          {/* Header section end */}

          <div className="container" id="detail">
            <div className="main-video-container">
              <iframe
                className="main-video"
                height={415}
                src={`https://www.youtube.com/embed/${videodetail[0].id}`}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <div className="w-100 my-4">
                <h5 className="d-flex align-item-center ">
                  <FaBook />{" "}
                  <div className="mx-2">
                    {videodetail[0].statistics.commentCount} Comments
                  </div>
                </h5>
              </div>
              {/* <h3 className="main-vid-title">house flood animation</h3> */}
              <div className="bg-light p-4 discr">
                {parser.parse(
                  convertToHtml(
                    videodetail[0] && videodetail[0].snippet.description
                  )
                )}
              </div>
              <div className="comments my-4 py-2 ">
                <form>
                  <div className="w-100 my-4 py-2">
                    <h5 className="d-flex align-item-center ">
                      <FaBook /> <div className="mx-2">Post Your Comment</div>
                    </h5>
                  </div>
                  <textarea
                    ref={textareaRef}
                    placeholder={backUp}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                  {showBtn && (
                    <div className="btn">
                      <input
                        className="btn btn-sm btn-primary mr-2"
                        type="submit"
                        defaultValue="Comment"
                      />
                      <button
                        className="btn btn-sm btn-warning"
                        id="clear"
                        href="#"
                        onClick={handleClear}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </form>
              </div>
              <div className="comment-container my-4">
                {commentdata.items &&
                  commentdata.items.map((data, index) => (
                    <>
                      <div className="comment-box row mx-0" key={index}>
                        <div className="col-2 img">
                          {data.authorProfileImageUrl && (
                            <img src={data.authorProfileImageUrl} alt="" />
                          )}
                          {!data.authorProfileImageUrl && (
                            <span>
                              <FaUser />
                            </span>
                          )}
                        </div>
                        <div className="col-10 detaila">
                          <h6>
                            {data.author}
                            <small className="mx-2">
                              <span>posted on:</span>
                              {data.updatedAt.slice(0, 10)}
                            </small>
                          </h6>
                          <p>{data.text}</p>
                        </div>
                      </div>
                    </>
                  ))}

                <div className="d-flex py-4 my-2 justify-content-end align-item-center">
                  <a
                    href={`https://www.youtube.com/watch?v=${VIDEO_ID}`}
                    className="btn btn-danger"
                    target="_blank"
                  >
                    View More
                  </a>
                </div>
              </div>
            </div>
            <div className=" video-list-main-div">
              <div className="mb-4 video-list-inner-div">
                <div className="row no-margin video-title">
                  <h5>
                    <FaBook /> Related Videos
                  </h5>
                </div>
                <div className="video-list-container">
                  <Link to={`/about/${VIDEO_ID}`} className={`list active`}>
                    {/* <video src="images/vid-1.mp4" className="list-video" /> */}
                    <img
                      className="list-video"
                      src={videodetail[0].snippet.thumbnails.medium.url}
                      alt=""
                    />

                    <h3 className="list-title">
                      {videodetail[0].snippet.title}...
                    </h3>
                  </Link>

                  {playlistData &&
                    playlistData.map((data, index) => (
                      <>
                        <Link
                          to={`/about/${data.id.videoId}`}
                          className={`list`}
                          key={index}
                        >
                          {/* <video src="images/vid-1.mp4" className="list-video" /> */}
                          <img
                            className="list-video"
                            src={data.snippet.thumbnails.medium.url}
                            alt=""
                          />

                          <h3 className="list-title">
                            {data.snippet.title.slice(0, 50)}...
                          </h3>
                        </Link>
                      </>
                    ))}
                </div>
              </div>

              <div className="my-4  video-list-inner-div">
                <div className="row no-margin video-title">
                  <h5>
                    <FaBook /> Top Rated Playlist
                  </h5>
                </div>
                <div className="video-list-container h-auto">
                  {Playlist &&
                    Playlist.items.map((data, index) => (
                      <>
                        <Link
                          to={`/about/${VIDEO_ID}`}
                          className={`list`}
                          key={index}
                        >
                          <h3 className="list-title">{data.snippet.title}</h3>
                        </Link>
                      </>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Video;
