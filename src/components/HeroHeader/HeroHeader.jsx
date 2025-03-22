import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import brandLogo from "../../assets/logos/skintuition_logo.png";
import profileIcon from "../../assets/Icons/user-profile.png";
import DropDown from "../DropDown/DropDown";

import "./HeroHeader.scss";

function HeroHeader({ isLoggedIn, handleLogout }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [titleClass, setTitleClass] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      if (scrollY > viewportHeight) {
        setIsScrolled(true);
        setTitleClass("in-nav");
      } else {
        setIsScrolled(false);
        setTitleClass("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="homepage__container">
      <div className={`homepage__nav ${isScrolled ? "scrolled" : ""}`}>
        <Link to="/">
          <img className="homepage__logo" src={brandLogo} alt="Brand Logo" />
        </Link>

        <div className="homepage__profile">
          {isLoggedIn ? (
            <DropDown handleLogout={handleLogout} />
          ) : (
            <Link to="/login">
              <button className="homepage__profile-button">
                <img
                  className="homepage__profile-icon"
                  src={profileIcon}
                  alt="Default Profile Icon"
                />
              </button>
            </Link>
          )}
        </div>
      </div>

      <h1 className={`homepage__title ${titleClass}`}>Skintuition</h1>
    </div>
  );
}

export default HeroHeader;
