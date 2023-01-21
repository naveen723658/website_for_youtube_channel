import react, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaComments } from "react-icons/fa";
import { FaAngleRight, FaUser, FaBook } from "react-icons/fa";
const Latest = ({youtubedata}) => {
  // console.log(youtubedata)
  return (
    <>

        {youtubedata.map((item, index) => (

        <div className={`py-4 container-fluid ${index % 2 === 0 ? "bg-light" : "bg-white"}`} key={index}>
          <div className="container">
            <div className="row no-margin video-title">
              <h6 className="d-flex align-item-center justify-content-center">
                <span className="mr-2"><FaBook /> </span>
                {item.title}
              </h6>
            </div>
            <div className="video-row row">
            {item.items.map((data, index) => (
                  <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
                    <Link to={`/about/${data.snippet.resourceId.videoId}/${item.playlistsId}`} key={index}>
                      <div className="video-card">
                        <img
                          src={data.snippet.thumbnails.medium.url}
                          alt="thumbnail"
                        />
                        <div className="row details no-margin">
                          <h6>{data.snippet.title}</h6>
                          <div className="col-md-6 col-6 no-padding left">
                            <div className="">
                            <span className="mr-2 my-auto"> <FaEye/></span>
                            <span>
                              {data.statistics && data.statistics.viewCount}
                            </span>
                            </div>
                          </div>
                          <div className="col-md-6 col-6 no-padding right">
                            <div className="">
                            <span className="mr-2 my-auto"><FaComments /></span>
                            <span>
                              {data.statistics && data.statistics.commentCount}
                            </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
        ))}
   

    </>
  );
};
export default Latest;
