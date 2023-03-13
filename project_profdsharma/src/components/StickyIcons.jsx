import {
  FaInstagram,
  FaFacebookF,
  FaGooglePlusG,
  FaYoutube,
  FaTwitter,
  FaShareAlt,
} from "react-icons/fa";
import React, { useState, useEffect } from "react";

import { Fab, styled } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ScrollTopButton = styled(Fab)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(2),
  left: theme.spacing(2),
  zIndex: 100,
}));

const StickyIcons = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const handleButtonClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div id="social-share">
        <ul className={`social-itens ${isOpen ? "open" : "hidden"}`}>
          <li>
            <a
              href="https://www.instagram.com/?hl=en"
              className="btn-share social-item-4 Instagram"
            >
              <FaInstagram />
              <span className="btn-share-text">Instagram</span>
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/"
              className="btn-share social-item-3 Facebook"
            >
              <FaFacebookF />
              <span className="btn-share-text">Facebook</span>
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/"
              className="btn-share social-item-2 Youtube"
            >
              <FaYoutube />
              <span className="btn-share-text">Youtube</span>
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/login"
              className="btn-share social-item-1 Twitter"
            >
              <FaTwitter />
              <span className="btn-share-text">Twitter</span>
            </a>
          </li>
        </ul>
        <div className="social-open-menu">
          <button
            className={`btn-share ${isOpen ? "" : "opacity-5"}`}
            onClick={toggleMenu}
          >
            <FaShareAlt />
          </button>
        </div>
      </div>
      <div className="">
        {showButton && (
          <ScrollTopButton
            className="button opacity-5"
            color="primary"
            sx={{outline: 'none !important'}}
            aria-label="scroll to top"
            onClick={handleButtonClick}
          >
            <KeyboardArrowUpIcon />
          </ScrollTopButton>
        )}
      </div>
    </>
  );
};
export default StickyIcons;
