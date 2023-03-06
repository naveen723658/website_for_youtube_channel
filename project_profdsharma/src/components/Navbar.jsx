import react, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { FaEnvelope, FaClock } from "react-icons/fa";
import axios from "axios";
let text1 =
  "For any kind of astrological consultation from Prof. Dharmender Sharma ji or making of Vedic birth chart Contact:- +91-8587924072 9268319743 9582248029 8130948703";
let text2 =
  "प्रो.धर्मेन्द्र शर्मा जी से किसी भी प्रकार के ज्योतिषीय परामर्श या वैदिक जन्मपत्रिका निर्माण हेतु  संपर्क करें:- +91-8587924072 9268319743 9582248029 8130948703";
const Navbar = () => {
  const navitems = [
    {
      id: 1,
      path: "/",
      pathName: "Home",
    },
    {
      id: 2,
      path: "/about_us",
      pathName: "About Us",
    },
    {
      id: 3,
      path: "/stotra-and-stuti",
      pathName: "Stotra And Stuti",
    },
    {
      id: 4,
      path: "/seminar",
      pathName: "Glimpse of Our Seminar",
    },
    {
      id: 5,
      path: "/public-opinion",
      pathName: "Public Opinion",
    },
    {
      id: 6,
      path: "/Contact",
      pathName: "Contact US",
    },
  ];

  const [headerData, setHeaderData] = useState([]);
  const [contactData, setContactData] = useState([]);
  const [EmailData, setEmailData] = useState([]);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleClick = () => {
    setMobileNavOpen(!mobileNavOpen);
  };
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
                  <li className="d-none d-lg-block " key={1123}>
                    <span className="ml-0 mr-2 icon">
                      <FaEnvelope />
                    </span>
                    {EmailData && EmailData.map((value) => <>{value.email}</>)}
                    <span>|</span>
                  </li>
                  <li className="m-auto ml-md-0 " key={151}>
                    <span className="ml-0 mr-2 icon">
                      <FaClock />
                    </span>
                    For Appointment
                  </li>
                </ul>
                <ul className="ulright d-flex align-item-center">
                  <li className="m-scroll col-12 mr-0" key={186}>
                    <div className="m-scroll__title">
                      <div>
                        {headerData &&
                          headerData.map((data, index) => (
                            <p key={index}>
                              {data.appointment}{" "}
                              {contactData &&
                                contactData.map((item, index) => (
                                  <span key={item.id}>+91 {item.no}</span>
                                ))}{" "}
                            </p>
                          ))}

                        <p>{text2}</p>
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
              <nav className="navbar">
                {headerData &&
                  headerData.map((data, index) => (
                    <img className="logo" key={index} src={data.logo} alt="" />
                  ))}
                <div
                  className="menu-toggle"
                  onClick={handleClick}
                  id="mobile-menu"
                >
                  <span className="bar" />
                  <span className="bar" />
                  <span className="bar" />
                </div>
                <ul
                  className={`nav no-search ${
                    mobileNavOpen ? "mobile-nav" : ""
                  }`}
                  key={1110}
                >
                  {navitems &&
                    navitems.map((item, index) => (
                      <>
                        <li className="nav-item" key={index}>
                          <Link to={item.path} key={item.id}>
                            {item.pathName}
                          </Link>
                        </li>
                      </>
                    ))}
                </ul>
              </nav>
            </div>
          </div>
          <div className="grad-bar" />
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Navbar;
