import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";

const Category = () => {
  const [youtubedata, setYoutubedata] = useState([]);
  const [playlist, setPlaylist] = useState(null);
  const [pageToken, setPageToken] = useState([]);
  const [Token, setToken] = useState("None");
  const PageToken = (mytoken) => {
    setPageToken(mytoken);
    console.log(mytoken)
    // fetch()
  };
  const fetch = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/playlists/${pageToken}`
      );
      // console.log(response.data);
      // setPlaylist(response.data);
      const { items, nextPageToken } = response.data;
      setPlaylist([...items]);
      setToken(nextPageToken);
      console.log("token = ", nextPageToken)
      if (!nextPageToken) {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  },[pageToken]);

console.log('pagetoken = ', pageToken)
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/combine_data/")
      .then((res) => {
        setYoutubedata(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setYoutubedata]);
  return (
    <>
      {youtubedata.playlists && (
        <section className="sesion-type bg-light">
          <div className="container">
            <div className="inner-title row">
              <h2>Top Category</h2>
              <p>Our Top rated Playlist</p>
            </div>
            <div className="row">
              {youtubedata.playlists.items.map((item, index) => (
                <div className="col-md-4 col-sm-6" key={index}>
                  <div className="single-sess sess-ok d-flex justify-content-center align-item-center mycard">
                    <h4 className="text-center my-auto ">
                      {item.snippet.title}
                    </h4>
                  </div>
                </div>
              ))}
              <div className="col-md-4 col-sm-6 ">
                <div className="single-sess sess-ok d-flex justify-content-center align-item-center mycard">
                  {/* <h4 className="btn btn-danger my-auto">View all Category</h4> */}
                  <button
                    className="btn btn-danger my-auto"
                    onClick={() => PageToken(Token)}
                  >
                    View more Category
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default Category;
