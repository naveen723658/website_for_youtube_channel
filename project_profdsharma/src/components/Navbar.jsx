import react, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { FaEnvelope, FaClock } from "react-icons/fa";
import axios from "axios";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

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
  const [anchorElNav, setAnchorElNav] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/home/header/")
      .then((res) => {
        setHeaderData(res.data);
        console.log(res.data);
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

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

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
          <AppBar position="static" className="bg-light text-dark">
            <Toolbar
              disableGutters
              className="container justify-content-between"
            >
              {headerData.length > 0 ? (
                <img className="logo" src={headerData[0].logo} alt="" />
              ) : (
                <AdbIcon sx={{ display: "flex", mr: 1 }} />
              )}

              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex", justifyContent: "end" },
                }}
              >
                {navitems &&
                  navitems.map((item, index) => (
                    <>
                      <Link to={item.path} key={item.id}>
                        <Typography
                          sx={{
                            p: 2,
                            border: "none",
                            display: "block",
                          }}
                          textAlign="end"
                        >
                          {item.pathName}
                        </Typography>
                      </Link>
                    </>
                  ))}
              </Box>

              {/* mobile navbar */}
              <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } , cursor:"pointer" }}>
                <IconButton
                  sx={{ outline: "none !important" }}
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                  
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {navitems &&
                    navitems.map((item, index) => (
                      <>
                        <Link to={item.path} key={item.id}>
                          <Typography
                            sx={{
                              p: 2,
                              border: "none",
                              display: "block",
                            }}
                            textAlign="start"
                          >
                            {item.pathName}
                          </Typography>
                        </Link>
                      </>
                    ))}
                </Menu>
              </Box>
            </Toolbar>
          </AppBar>

          <div className="grad-bar" />
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Navbar;
