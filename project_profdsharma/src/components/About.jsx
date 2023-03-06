import React from "react";
import Topheader from "./Topheader";

const About = () => {
  return (
    <>
      <Topheader title="About US" subtitle="about" />
      <div id="about" className="about-company">
        <div className="container">
          <div className="row align-item-center ">
            <div className="col-md-6">
              <div className="detail">
                <h3>Prof. Dharmender Sharma</h3>
                <p>
                  Prof. Dharmender Sharma is a well known and reputed name is
                  the field of Astrology, Palmistry and Vastushastra throughout
                  the country and partially in globe. He has a wide clientele in
                  India and Abroad as well. From a very young age, he in engaged
                  in the world of spirituality, and upliftment of religion.
                  Dharmender Sharma Ji, who love simplicity in the era of
                  pretense and pomp, paved the way of Mantra Sadhna and
                  Meditation. He has attained the distinction of success by
                  conducting so many programs on different TV channels. He has
                  promoted Indian astrology for a long time on may national
                  televisions like Zee News, P7, Sadhna, Katyayani, Ishwar Tv
                  and many more. He has organized many free astrology and
                  spiritual camps across the country. In his free Camps he has
                  worked to connect people with God, Spirituality and our
                  culture. Having spiritual, scientific and innovative vision he
                  is working a lot on elemental and remedial astrology. He uses
                  and practices astrology as a tool of betterment in human life.
                </p>
              </div>
            </div>
            <div
              className="col-md-6"
              style={{ display: "flex", alignItems: "center", height: "auto" }}
            >
              <div
                className="imag "
                style={{ display: "inline-block", height: "auto" }}
              >
                <img src="assets/images/anime-banner.gif" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default About;
