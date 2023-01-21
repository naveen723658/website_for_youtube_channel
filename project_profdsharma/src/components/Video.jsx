import React from "react";
import react, { useState, useEffect } from "react";
import HtmlToReact from "html-to-react";
import { FaAngleRight, FaUser, FaBook } from "react-icons/fa";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const Video = () => {
  const [Playlist, setPlaylist] = useState([]);
  const parser = new HtmlToReact.Parser();
  
  const parm = useParams();
  const VIDEO_ID = parm.videoId;
  const playlistId = parm.playlistId;
  const [playlistData, setPlaylistData] = useState([]);
  const [videodetail, setvideodetail] = useState([]);
  const [commentdata, setcommentdata] = useState([]);
  const fetchData = async () => {
    try {
      // video details or single video
      const videodetails = await axios.get(
        `http://127.0.0.1:8000/video_detail/${VIDEO_ID}`
      );
      setvideodetail(videodetails.data.items);

      // PlayList Item
      const playlists = await axios.get(
        // `https://www.googleapis.com/youtube/v3/playlists?channelId=${CHANNEL_ID}&key=${API_KEY}&part=snippet,contentDetails`
        'http://127.0.0.1:8000/playlists/'
      );
      // console.log(playlists.data.items);
      setPlaylist(playlists.data.items);

      // PlayList Video
      const playlistVideos = await axios.get(
        // `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${playlistId}&maxResults=8&part=snippet&key=${API_KEY}`
        `http://127.0.0.1:8000/playlist_items/${playlistId}/8`
      );
      setPlaylistData(
        playlistVideos.data.items.filter(
          (video) => video.snippet.resourceId.videoId !== VIDEO_ID
        )
      );

      // comments
      const comments = await axios.get(
        // `https://www.googleapis.com/youtube/v3/commentThreads?videoId=${VIDEO_ID}&maxResults=5&part=snippet&key=${API_KEY}`
        `http://127.0.0.1:8000/comments/${VIDEO_ID}`
      );
      const commentsList = comments.data.items;

      // Iterate over comments list to fetch comments and replies
      for (const comment of commentsList) {
        const replies = await axios.get(
          // `https://www.googleapis.com/youtube/v3/comments?parentId=${comment.id}&part=snippet&key=${API_KEY}`
          `http://127.0.0.1:8000/comments_replies/${comment.id}`
        );
        comment.replies = replies.data.items;
      }
      // console.log(commentsList);
      setcommentdata(commentsList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [VIDEO_ID, API_KEY]);

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
          {/* Header */}
          <div className="page-nav no-margin row">
            <div className="container">
              <div className="row">
                <h2>{videodetail[0].snippet.title}</h2>
                <ul>
                  <li>
                    {" "}
                    <a href="/">
                      <i className="fas fa-home" /> Home
                    </a>
                  </li>
                  <li>
                    <FaAngleRight /> About
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Header section end */}

          <div className="container-fluid video-blog">
            <div className="container">
              <div className="row">
                <div className="col-md-8">
                  <div className="video-cover">
                    <iframe
                      height={415}
                      src={`https://www.youtube.com/embed/${videodetail[0].id}`}
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    <div className="bg-light p-4 discr">
                      {parser.parse(
                        convertToHtml(
                          videodetail[0] && videodetail[0].snippet.description
                        )
                      )}
                    </div>
                    <div className="w-100 my-4">
                      <h5 className="d-flex align-item-center ">
                        <FaBook /> <div className="mx-2">{videodetail[0].statistics.commentCount} Comments</div>
                      </h5>
                    </div>

                    <div className="comment-container my-4">
                      {commentdata &&
                        commentdata.map((data, index) => (
                          <>
                            <div className="comment-box row mx-0" key={index}>
                              <div className="col-2 img">
                                {data.snippet.topLevelComment.snippet
                                  .authorProfileImageUrl && (
                                  <img
                                    src={
                                      data.snippet.topLevelComment.snippet
                                        .authorProfileImageUrl
                                    }
                                    alt=""
                                  />
                                )}
                                {!data.snippet.topLevelComment.snippet
                                  .authorProfileImageUrl && (
                                  <span>
                                    <FaUser />
                                  </span>
                                )}
                              </div>
                              <div className="col-10 detaila">
                                <h6>
                                  {
                                    data.snippet.topLevelComment.snippet
                                      .authorDisplayName
                                  }
                                <small className="mx-2">
                                  <span>posted on:</span>
                                  {data.snippet.topLevelComment.snippet.updatedAt.slice(
                                    0,
                                    10
                                  )}
                                </small>
                                </h6>
                                <p>
                                  {
                                    data.snippet.topLevelComment.snippet
                                      .textDisplay
                                  }
                                </p>
                              </div>
                            </div>
                          </>
                        ))}

                        <div className="d-flex justify-content-end align-item-center"><button className="btn btn-danger">Load more</button></div>
                    </div>

                   
                    <div className="w-100 my-4 pt-4">
                      <h5 className="d-flex align-item-center ">
                        <FaBook /> <div className="mx-2">Post Your Comment</div>
                      </h5>
                    </div>
           
                    <div className="comment-text mx-0">
                      <div className="form-row mx-0 row">
                        <input
                          type="text"
                          placeholder=" Enter Name"
                          className="form-control mx-0 form-control-sm"
                        />
                      </div>
                      <div className="form-row mx-0 row">
                        <input
                          type="text"
                          placeholder="Enter Mobile number"
                          className="form-control form-control-sm"
                        />
                      </div>
                      <div className="form-row mx-0 row">
                        <input
                          type="text"
                          placeholder="Enter Email Address"
                          className="form-control form-control-sm"
                        />
                      </div>
                      <div className="form-row mx-0 row">
                        <textarea
                          placeholder="Enter Comment"
                          rows={5}
                          className="form-control form-control-sm"
                          defaultValue={""}
                        />
                      </div>
                      <div className="form-row row">
                        <button className="btn btn-danger">Post Comment</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="row no-margin video-title">
                    <h5>
                      <FaBook/> Related Videos
                    </h5>
                  </div>
                  {playlistData &&
                    playlistData.map((data, index) => (
                      <Link
                        to={`/about/${data.snippet.resourceId.videoId}/${data.snippet.playlistId}`}
                      >
                        <div
                          className="contri-bghy"
                          key={index}
                          id={data.snippet.publishedAt}
                        >
                          <div className="image">
                            <img
                              className="rlv"
                              src={data.snippet.thumbnails.medium.url}
                              alt=""
                            />
                          </div>
                          <div className="detail">
                            <h6>{data.snippet.title.slice(0, 30)} ...</h6>
                            <span>
                              Posted on: {data.snippet.publishedAt.slice(0, 10)}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  {/* <div
                    className="row no-margin video-title"
                    bis_skin_checked={1}
                  >
                    <h6>
                      <i className="fas fa-book" /> Our Top Cetegory
                    </h6>
                  </div> */}

                  {Playlist &&
                    Playlist.map((item, index) => (
                      <div className="contri-row" key={index}>
                        <div className="image">
                          <img
                            src={item.snippet.thumbnails.medium.url}
                            alt=""
                          />
                        </div>
                        <div className="detail">
                          <h6>{item.snippet.title}</h6>
                          <span>
                            Published on: {item.snippet.publishedAt.slice(0, 4)}
                          </span>
                          <p>{item.contentDetails.itemCount} Videos</p>
                        </div>
                      </div>
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
