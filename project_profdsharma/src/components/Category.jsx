import React from "react";

const Category = (playlistitem) => {
  return (
    <>
      {playlistitem.playlistitem && (
        <section className="sesion-type bg-light">
          <div className="container">
            <div className="inner-title row">
              <h2>Top Category</h2>
              <p>Our Top rated Playlist</p>
            </div>
            <div className="row">
              {playlistitem.playlistitem.map((item, index) => (
              <div className="col-md-4 col-sm-6 " key={index}>
                <div className="single-sess sess-ok d-flex justify-content-center align-item-center">
                  <h4 className="text-center my-auto ">{item.snippet.title}</h4>
                </div>
              </div>
              ))}
              <div className="col-md-4 col-sm-6">
                <div className="single-sess sess-ok d-flex justify-content-center align-item-center">
                  <h4 className="btn btn-danger my-auto">View all Category</h4>
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
