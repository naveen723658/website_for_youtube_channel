import React, { useState, useEffect } from "react";
import counterUp from "counterup2";
import axios from "axios";
const Stats = () => {
  const [stats, setstats] = useState([]);
  useEffect(() => {
    const countNumbers = document.querySelectorAll(".count-number");
    countNumbers.forEach((countNumber) => {
      counterUp(countNumber, {
        duration: 1000,
        delay: 5,
      });
    });
    axios
      .get("http://127.0.0.1:8000/statistic/")
      .then((res) => {
        // console.log(res.data);
        setstats(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <section id="statistic" className="statistic-section one-page-section">
        <div className="container">
          <div className="row text-center">
            {stats.items && (
              <>
                <div className="col-xs-12 col-md-4">
                  <div className="counter">
                    <i className="fa fa-coffee fa-2x stats-icon" />
                    <h2 className="timer count-title count-number">
                      
                      {stats.items[0].statistics.viewCount} +{" "}
                    </h2>
                    <div className="stats-line-black" />
                    <p className="stats-text">View Count</p>
                  </div>
                </div>
                <div className="col-xs-12 col-md-4">
                  <div className="counter">
                    <i className="fa fa-code fa-2x stats-icon" />
                    <h2 className="timer count-title count-number">
                    {stats.items[0].statistics.subscriberCount} +{" "}
                    </h2>
                    <div className="stats-line-black" />
                    <p className="stats-text">Subscriber</p>
                   
                  </div>
                </div>
                <div className="col-xs-12 col-md-4">
                  <div className="counter">
                    <i className="fa fa-clock-o fa-2x stats-icon" />
                    <h2 className="timer count-title count-number">
                      {stats.items[0].statistics.videoCount} +{" "}
                    </h2>
                    <div className="stats-line-black" />
                    <p className="stats-text">Video</p>
                  </div>
                </div>
              </>
            )}

            {/* <div className="col-xs-12 col-md-3">
              <div className="counter">
                <i className="fa fa-laptop fa-2x stats-icon" />
                <h2 className="timer count-title count-number">12</h2>
                <div className="stats-line-black" />
                <p className="stats-text">Project</p>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Stats;
