import React from "react";
const Hero = ({herodata}) => {
  return (
    <>
      <div className="banner-card container-fluid">
        <div className="container">
          <div className="row">
            <div className="col-md-9 py-4 banner-slid">
              <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-ride="carousel"
              >
                <ol className="carousel-indicators">
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to={0}
                    className="active"
                  />
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to={1}
                  />
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to={2}
                  />
                </ol>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    {/* <a href="">
                      <img
                        src={channeldata}
                        className="d-block w-100"
                        alt="..."
                      />
                    </a> */}
                    <a href="">
                      <img
                        src="assets/images/anime-banner.gif"
                        className="d-block w-100"
                        alt="..."
                      />
                      {/* <div className="detail-card">
                        <p>
                          Pictures, abstract symbols the ingredients with
                          symbols the
                        </p>
                      </div> */}
                    </a>
                  </div>
                  {/* <div className="carousel-item">
                    <a href="single.html">
                      <img
                        src="assets/images/video/banner_2.jpg"
                        className="d-block w-100"
                        alt="..."
                      />
                      <div className="detail-card">
                        <p>
                          Pictures, abstract symbols the ingredients with
                          symbols the
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="carousel-item">
                    <a href="single.html">
                      <img
                        src="assets/images/video/banner_3.jpg"
                        className="d-block w-100"
                        alt="..."
                      />
                      <div className="detail-card">
                        <p>
                          Pictures, abstract symbols the ingredients with
                          symbols the
                        </p>
                      </div>
                    </a>
                  </div> */}
                </div>
                {/* <a
                  className="carousel-control-prev"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Next</span>
                </a> */}
              </div>
            </div>
            <div className="col-md-3 vgbh">
              <div className="row">
                {herodata.items && herodata.items.map((data, index) =>(

                <div className="video-card col-md-12 col-sm-6" key={index}>
                  <a href="single.html" id={data.id.videoId}>
                    <img src={data.snippet.thumbnails.medium.url} alt="" />
                    <div className="detail-card">
                      <p>{data.snippet.title}</p>
                    </div>
                  </a>
                </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Hero;
