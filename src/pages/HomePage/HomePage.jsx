import FeatureCards from "../../components/FeatureCards/FeatureCards";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import OurMission from "../../components/OurMission/OurMission";
import "./HomePage.scss";

function HomePage() {
  return (
    <>
      <Header />
      <OurMission/>
      <FeatureCards/>
      {/* <Footer /> */}
    </>
  );
}

export default HomePage;
