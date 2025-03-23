import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import brandLogo from "../../assets/logos/skintuition.png";
import profileIcon from "../../assets/icons/logged-out.png";
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
    <div className="hero__container">
      <div className={`hero__nav ${isScrolled ? "scrolled" : ""}`}>
        <Link to="/">
          <img className="hero__logo" src={brandLogo} alt="Brand Logo" />
        </Link>

        <div className="hero__profile">
          {isLoggedIn ? (
            <DropDown handleLogout={handleLogout} />
          ) : (
            <Link to="/login">
              <button className="hero__profile--button">
                <img
                  className="hero__profile--icon"
                  src={profileIcon}
                  alt="Default Profile Icon"
                />
              </button>
            </Link>
          )}
        </div>
      </div>

      <h1 className={`hero__title ${titleClass}`}>Skintuition</h1>
    </div>
  );
}

export default HeroHeader;
