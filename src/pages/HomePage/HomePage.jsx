import "./HomePage.scss";
import { useState, useEffect } from "react";
import FeatureCards from "../../components/FeatureCards/FeatureCards";
import Footer from "../../components/Footer/Footer";
import OurMission from "../../components/OurMission/OurMission";
import BrandCarousel from "../../components/BrandCarousel/BrandCarousel";
import HeroHeader from "../../components/HeroHeader/HeroHeader";

function HomePage() {
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

  return (
    <>
      <HeroHeader isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <OurMission />
      <h2 className="carousel--title">
        <span>Trusted by Us</span>
      </h2>
      <BrandCarousel />
      <FeatureCards />
      <Footer />
    </>
  );
}

export default HomePage;
