import React from "react";
const Hero = ({herodata}) => {
  return (
    <>
      <div className="banner-card container-fluid">
        <div className="container">
          <div className="row">
            <div className="col-md-12 py-0 py-md-4 banner-slid">
              <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">

                    <a href="">
                      <img
                        src="assets/images/anime-banner.gif"
                        className="d-block w-100"
                        alt="..."
                      />
                    </a>
                  </div>

                </div>
              </div>
              <div className="grad-bar" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Hero;
