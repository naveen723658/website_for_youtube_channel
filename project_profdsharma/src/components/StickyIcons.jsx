import { FaInstagram, FaFacebookF, FaGooglePlusG, FaYoutube, FaTwitter } from 'react-icons/fa';

const StickyIcons = () =>{
    return (
        <div className="sticky-icon">
           <a href="https://www.instagram.com/?hl=en" className="Instagram">
              <FaInstagram /> Instagram
           </a>
           <a href="https://www.facebook.com/" className="Facebook">
              <FaFacebookF /> Facebook
           </a>
           <a href="https://aboutme.google.com/u/0/?referer=gplus" className="Google">
              <FaGooglePlusG /> Google +
           </a>
           <a href="https://www.youtube.com/" className="Youtube">
              <FaYoutube /> Youtube
           </a>
           <a href="https://twitter.com/login" className="Twitter">
              <FaTwitter /> Twitter
           </a>   
        </div>
      )
}
export default StickyIcons;
