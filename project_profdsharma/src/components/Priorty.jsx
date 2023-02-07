import react, { useState, useEffect } from "react";
import 'swiper/css/bundle'
const Priorty = () => {   
    useEffect(() => {
        const script = document.createElement("script")
        script.innerHTML = `
        var swiper = new Swiper(".blog-slider", {
          spaceBetween: 30,
          effect: "fade",
          loop: true,
          mousewheel: {
            invert: false,
          },
          // autoHeight: true,
          pagination: {
            el: ".blog-slider__pagination",
            clickable: true,
          },
        })`
        document.body.appendChild(script)
      }, [])
  
  return (
    <>
      <section className="py-4 priorty">
        <div className="blog-slider">


          <div className="blog-slider__wrp swiper-wrapper">
            <div className="blog-slider__item swiper-slide">
              <div className="blog-slider__img">
              {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/uBIx8MWfY70" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
              </div>
              <div className="blog-slider__content">
                <span className="blog-slider__code">26 December 2019</span>
                <div className="blog-slider__title">Lorem Ipsum Dolor</div>
                <div className="blog-slider__text">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Recusandae voluptate repellendus magni illo ea animi?{" "}
                </div>
                <a href="#" className="blog-slider__button">
                  READ MORE
                </a>
              </div>
            </div>
            <div className="blog-slider__item swiper-slide">
              <div className="blog-slider__img">
                <img
                  src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759871/jason-leung-798979-unsplash.webp"
                  alt=""
                />
              </div>
              <div className="blog-slider__content">
                <span className="blog-slider__code">26 December 2019</span>
                <div className="blog-slider__title">Lorem Ipsum Dolor2</div>
                <div className="blog-slider__text">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Recusandae voluptate repellendus magni illo ea animi?
                </div>
                <a href="#" className="blog-slider__button">
                  READ MORE
                </a>
              </div>
            </div>
            <div className="blog-slider__item swiper-slide">
              <div className="blog-slider__img">
                <img
                  src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759871/alessandro-capuzzi-799180-unsplash.webp"
                  alt=""
                />
              </div>
              <div className="blog-slider__content">
                <span className="blog-slider__code">26 December 2019</span>
                <div className="blog-slider__title">Lorem Ipsum Dolor</div>
                <div className="blog-slider__text">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Recusandae voluptate repellendus magni illo ea animi?
                </div>
                <a href="#" className="blog-slider__button">
                  READ MORE
                </a>
              </div>
            </div>
          </div>
          <div className="blog-slider__pagination" />
                    

        </div>
      </section>
    </>
  );
};

export default Priorty;
