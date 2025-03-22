import "./HomePage.scss";
import FeatureCards from "../../components/FeatureCards/FeatureCards";
import Footer from "../../components/Footer/Footer";
import OurMission from "../../components/OurMission/OurMission";
import { useState, useEffect } from "react";
import BrandCarousel from "../../components/BrandCarousel/BrandCarousel";
import HeroHeader from "../../components/HeroHeader/HeroHeader";

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
        <HeroHeader isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      </div>
      <OurMission />
      <h2 className="homepage__carousel-title">
        <span>Trusted by the Best in Skincare</span>
      </h2>
      <BrandCarousel />
      <FeatureCards />
      <Footer />
    </>
  );
}

export default HomePage;
