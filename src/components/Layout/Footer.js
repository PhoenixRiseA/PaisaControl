import React from "react";
import classes from "./Footer.module.css";
import instagramIcon from "../../assets/instagram.png";
import twitterIcon from "../../assets/twitter.png";
import youtubeIcon from "../../assets/youtube.png";
const Footer = () => {
  return (
    <footer className={classes.footer}>
      <ul>
        <li>
          <a
            href="https://www.flaticon.com/free-icons/youtube"
            title="youtube icons"
          >
            Youtube
          </a>
          <img src={youtubeIcon} alt="Youtube" />
        </li>
        <li>
          <a
            href="https://www.flaticon.com/free-icons/instagram"
            title="instagram icons"
          >
            Instagram
          </a>
          <img src={instagramIcon} alt="Instagram" />
        </li>
        <li>
          <a
            href="https://www.flaticon.com/free-icons/social"
            title="social icons"
          >
            Twitter
            <img src={twitterIcon} alt="twitter" />
          </a>
        </li>
      </ul>
    </footer>
  );
};
export default Footer;
