import react, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { FaEnvelope, FaClock } from "react-icons/fa";
import axios from "axios";
let text1 =
  "For any kind of astrological consultation from Prof. Dharmender Sharma ji or making of Vedic birth chart Contact:- +91-8587924072 9268319743 9582248029 8130948703";
let text2 =
  "प्रो.धर्मेन्द्र शर्मा जी से किसी भी प्रकार के ज्योतिषीय परामर्श या वैदिक जन्मपत्रिका निर्माण हेतु  संपर्क करें:- +91-8587924072 9268319743 9582248029 8130948703";
let email = "shriindrakshidhaam@gmail.com";
const Navbar = () => {
  const [headerData, setHeaderData] = useState([]);
  const [contactData, setContactData] = useState([]);
  const [EmailData, setEmailData] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/home/header/")
      .then((res) => {
        setHeaderData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://127.0.0.1:8000/home/ContactNumber/")
      .then((res) => {
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
      });
  }, []);

  return (
    <>
      <header className="continer-fluid">
        <div className="header-top">
          <div className="container">
            <div className="row col-det">
              <div className="col-12 px-0 d-md-flex justify-content-lg-between align-item-center">
                <ul className="ulleft col-auto mx-md-0 ">
                  <li className="d-none d-lg-block ">
                    <span className="ml-0 mr-2 icon">
                      <FaEnvelope />
                    </span>
                    {EmailData && EmailData.map((value) => <>{value.email}</>)}
                    <span>|</span>
                  </li>
                  <li className="m-auto ml-md-0 ">
                    <span className="ml-0 mr-2 icon">
                      <FaClock />
                    </span>
                    For Appointment
                  </li>
                </ul>
                <ul className="ulright d-flex align-item-center">
                  <li className="m-scroll col-12 mr-0">
                    <div className="m-scroll__title">
                      <div>
                        {headerData &&
                          headerData.map((data) => (
                            <p>
                              {data.appointment}{" "}
                              {contactData &&
                                contactData.map((item) => (
                                  <span key={item.id}>+91 {item.no}</span>
                                ))}{" "}
                              &nbsp;
                            </p>
                          ))}

                        <p>{text2}&nbsp;</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="header-bottom">
          <div className="container">
            <div className="nav-wrapper">
              <div className="logo-container">
                {headerData &&
                  headerData.map((data) => (
                    <img className="logo" src={data.logo} alt="" />
                  ))}
              </div>
              <nav className="d-flex align-item-center">
                <input className="hidden" type="checkbox" id="menuToggle" />
                <label className="menu-btn" htmlFor="menuToggle">
                  <div className="menu" />
                  <div className="menu" />
                  <div className="menu" />
                </label>
                <div className="nav-container">
                  <ul className="nav-tabs">
                    <li className="nav-item active">
                      <Link className="nav-tab" to="/">
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-tab" to="/">
                        About Us
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-tab" to="/">
                        Stotra And Stuti
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-tab" to="/">
                        Glimpse of Our Seminar
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-tab" to="/">
                        Public Opinion
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-tab" to="/">
                        Contact US
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Navbar;
