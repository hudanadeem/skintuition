import FeatureCards from "../../components/FeatureCards/FeatureCards";
import Footer from "../../components/Footer/Footer";
import OurMission from "../../components/OurMission/OurMission";
import NavBar from "../../components/NavBar/NavBar";
import Hero from "../../components/Hero/Hero";
import "./HomePage.scss";

function HomePage() {
  return (
    <>
      <NavBar />
      <Hero />
      <OurMission />
      <FeatureCards />
      <Footer />
    </>
  );
}

export default HomePage;
