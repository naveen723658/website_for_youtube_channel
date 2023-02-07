import react, { useState, useEffect } from "react";
import {
  FaGithub,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaAngleRight,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import axios from "axios";



const Footer = () => {
  const [contactData, setContactData] = useState([]);
  const [EmailData, setEmailData] = useState([]);
  const [tags, settags] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/home/ContactNumber/")
      .then((res) => {
        // console.log(res.data)
        setContactData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://127.0.0.1:8000/home/EmailAddress/")
      .then((res) => {
        setEmailData(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
      
    axios
      .get("http://127.0.0.1:8000/statistic/")
      .then((res) => {
        // console.log()
        const keywordsString = res.data.items[0].brandingSettings.channel.keywords;
        const keywordsList = keywordsString.split('\n');
        settags(keywordsList);
      })
      .catch((error) => {
        console.log(error);
      })
      
    // axios
    //   .get(`https://www.googleapis.com/youtube/v3/channels`, {
    //     params: {
    //       part: "brandingSettings",
    //       id: CHANNEL_ID,
    //       key: API_KEY,
    //     },
    //   })
      // .then((response) => {
      //   console.log(response.brandingSettings.channel.keywords);
      //   settags(response.data.items[0].snippet.tags)
      // })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      {/* col btn btn-default */}
      
      <div className="footer-ablove">
        <div className="container">
          <div className="d-block d-lg-flex justify-content-between align-item-center">
            <p className="col getp ">
              Get in touch with us for any kind of astrological consultation
            </p>
            <div className="subscribe_now">
              <form className="row justify-content-between align-item-center subscribe_form">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    placeholder="Enter your email"
                    id="subscribebtn"
                  />
                  <span className="input-group-btn">
                    <button className="btn btn-default" type="submit">
                      subscribe
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <footer className="kilimanjaro_area">
        <div className="foo_top_header_one section_padding_100_70">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6 col-lg-4">
                <div className="kilimanjaro_part">
                  <h5>Location</h5>
                  <address>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224346.481295689!2d77.06889897623357!3d28.527280343163746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1674247597963!5m2!1sen!2sin"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                    <p className="my-2">
                      {" "}
                      हस्तरेखा एवं वास्तुशास्त्र विशेषज्ञ, नई दिल्ली
                    </p>
                  </address>
                </div>
                <div className="kilimanjaro_part m-top-15">
                  <h5>Social Links</h5>
                  <ul className="kilimanjaro_social_links">
                    <li>
                      <a href="#">
                        <i className="fa fa-facebook" aria-hidden="true" />{" "}
                        Facebook
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-twitter" aria-hidden="true" />{" "}
                        Twitter
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-pinterest" aria-hidden="true" />{" "}
                        Pinterest
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-youtube" aria-hidden="true" />{" "}
                        YouTube
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-linkedin" aria-hidden="true" />{" "}
                        Linkedin
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <div className="kilimanjaro_part">
                  <h5>Tags Widget</h5>
                  <ul className=" kilimanjaro_widget">
                { tags.map((item, index) =>(
                   <li key={index}>
                   <a href="#">{item}</a>
                 </li>
                )) }
                </ul>
                 
                </div> 
               
                <div className="kilimanjaro_part m-top-15">
                  <h5>Important Links</h5>
                  <ul className="kilimanjaro_links">
                    <li>
                      <a href="#">
                        <i className="fa fa-angle-right" aria-hidden="true" />
                        Home
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-angle-right" aria-hidden="true" />
                        About Us
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-angle-right" aria-hidden="true" />
                        Stotra And Stuti
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-angle-right" aria-hidden="true" />
                        Glimpse of Our Seminar
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-angle-right" aria-hidden="true" />
                       Public Opinion
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-angle-right" aria-hidden="true" />
                         Contact US
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <div className="kilimanjaro_part">
                  <h5>Quick Contact</h5>
                  {contactData && (
                    <div className="kilimanjaro_single_contact_info">
                      <h5 className="mb-2">Phone:</h5>
                      {contactData.map((item, index) => (
                        <>
                          <p>
                            <span className="mr-2 item-cente">
                              <FaPhoneAlt />
                            </span>
                            +91 {item.no}
                          </p>
                        </>
                      ))}
                    </div>
                  )}
                  {EmailData && (
                    <div className="kilimanjaro_single_contact_info mt-4">
                      <h5 className="mb-2">Email:</h5>
                      {EmailData.map((value) => (
                        <p>
                          <span className="mr-2 item-cente">
                            <FaEnvelope />
                          </span>
                          {value.email}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="copy">
        <div className="container">
          2023 © All Rights Reserved | Designed and Developed by{" "}
          <a href="https://github.com/naveen723658">naveen723658</a>
          <span className="social_footer">
            <a href="" target="_blank">
              <FaYoutube />
            </a>

            <a href="">
              <FaInstagram />
            </a>
            <a href="">
              <FaLinkedinIn />
            </a>
            <a href="">
              <FaTwitter />
            </a>
            <a href="">
              <FaFacebook />
            </a>
            <a href="https://github.com/naveen723658" target="_blank">
              <FaGithub />
            </a>
          </span>
        </div>
      </div>
    </>
  );
};
export default Footer;
