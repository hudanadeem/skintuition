import FeatureCards from "../../components/FeatureCards/FeatureCards";
import Footer from "../../components/Footer/Footer";
import OurMission from "../../components/OurMission/OurMission";
import NavBar from "../../components/NavBar/NavBar";
import Hero from "../../components/Hero/Hero";
import brandLogo from "../../assets/logos/skintuition_logo.png";
import profileIcon from "../../assets/Icons/user-profile.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./HomePage.scss";
import DropDown from "../../components/DropDown/DropDown";
import BrandCarousel from "../../components/BrandCarousel/BrandCarousel";

function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [titleClass, setTitleClass] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

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
    <>
      <div className="homepage">
        <div className="homepage__container">
          <div className={`homepage__nav ${isScrolled ? "scrolled" : ""}`}>
            {/* Logo */}
            <Link to="/">
              <img
                className="homepage__logo"
                src={brandLogo}
                alt="Brand Logo"
              />
            </Link>

            {/* Profile Icon: conditional based on login status */}
            <div className="homepage__profile">
              {isLoggedIn ? (
                <DropDown handleLogout={handleLogout}/>
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
      </div>

      <OurMission />
      <BrandCarousel/>

      {/* <NavBar />
      <Hero />
      <OurMission />
      <FeatureCards />
      <Footer /> */}
    </>
  );
}

export default HomePage;
