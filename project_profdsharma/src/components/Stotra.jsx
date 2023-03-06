import React, { useEffect, useState } from "react";
import { FaAngleDoubleRight, FaHome, FaBook } from "react-icons/fa";
import axios from "axios";
import Topheader from "./Topheader";
import { Link } from "react-router-dom";
const Stotra = () => {
  const [cetegory, setcetegory] = useState([]);
  const [cetegoryitem, setcetegoryitem] = useState([]);
  const [youtubedata, setYoutubedata] = useState([]);
  //   const [itemcount, setitemcount] = useState([])
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/home/StotraAndStutiCategory/")
      .then((res) => {
        setcetegory(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://127.0.0.1:8000/home/StotraAndStuti/")
      .then((res) => {
        console.log(res.data);
        setcetegoryitem(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://127.0.0.1:8000/combine_data/")
      .then((res) => {
        setYoutubedata(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setYoutubedata]);
  console.log(cetegoryitem)
  return (
    <>
      <section>
        <Topheader title="Stotra & Stuti" subtitle="Stotra-and-Stuti" />
        <div className="container">
          <div className=" video-list-main-div" id="detail">
          <div className="main-video-container">
              {cetegory.map((data, index) => (
                <>
                  <div className="my-4 py-4 text-center" key={index}>
                    <h4 className="text-danger">{data.title}</h4>
                    <p style={{ textAlign: "justify", fontWeight: "bold" }}>
                      {data.desc}
                    </p>
                    <div className="column col_stotra">
                      {cetegoryitem
                        .filter((item) => data.id === item.category.id)
                        .map((item, index) => (
                          <>
                            <img
                              className={`col-12 col-md-${
                                12 /
                                cetegoryitem.filter(
                                  (item) => data.id === item.category.id
                                ).length
                              }`}
                              src={item.img}
                              alt=""
                              key={index}
                            />
                          </>
                        ))}
                    </div>
                  </div>
                </>
              ))}
            </div>
            <div className=" video-list-inner-div">
              <div className="row no-margin video-title">
                <h5>
                  <FaBook /> Top Rated Playlist
                </h5>
              </div>
              <div className="video-list-container h-auto">
                {youtubedata.playlists &&
                  youtubedata.playlists.items.map((data, index) => (
                    <>
                      <Link to={`/`} className={`list`} key={index}>
                        <h3 className="list-title">{data.snippet.title}</h3>
                      </Link>
                    </>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Stotra;
