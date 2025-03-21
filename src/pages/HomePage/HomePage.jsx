import FeatureCards from "../../components/FeatureCards/FeatureCards";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import OurMission from "../../components/OurMission/OurMission";
import "./HomePage.scss";

function HomePage() {
  return (
    <>
      <Header />
      <OurMission />
      <FeatureCards />
      <div className="footer__copyright">
        © 2025 Skintuition. All rights reserved.
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default HomePage;
