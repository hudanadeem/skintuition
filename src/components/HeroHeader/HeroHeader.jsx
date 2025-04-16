import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import brandLogo from "../../assets/logos/skintuition.png";
import profileIcon from "../../assets/icons/logged-out.png";
import heroImage from "../../assets/images/hero_img.jpg"; // Make sure this is the image you want to use
import DropDown from "../DropDown/DropDown";

import "./HeroHeader.scss";

function HeroHeader({ isLoggedIn, handleLogout }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = heroRef.current;
      if (!heroSection) return;

      const heroHeight = heroSection.offsetHeight;
      const scrollY = window.scrollY;
      const triggerPoint = heroHeight * 0.8; // Trigger at 80% of hero height

      setIsScrolled(scrollY > triggerPoint);
    };

    // Run once on mount to set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="hero" ref={heroRef}>
      <div className={`hero__nav ${isScrolled ? "scrolled" : ""}`}>
        <Link to="/">
          <img className="hero__logo" src={brandLogo} alt="Brand Logo" />
        </Link>
        {isScrolled && <h1 className="hero__title in-nav">Skintuition</h1>}

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

      <div className="hero__container">
        <div className="hero__image-container">
          <div className="hero__image-bar hero__image-bar--left"></div>
          <div className="hero__image-wrapper">
            <img src={heroImage} alt="Skincare" className="hero__image" />
          </div>
          <div className="hero__image-bar hero__image-bar--right"></div>
        </div>
        <div className="hero__content">
          <h1 className={`hero__title ${isScrolled ? "hero__title--hidden" : ""}`}>
            Skintuition
          </h1>
          <p className="hero__slogan">Decode the Secrets to Your Skin</p>
        </div>
      </div>
    </div>
  );
}

export default HeroHeader;
