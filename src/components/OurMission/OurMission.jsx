import "./OurMission.scss";
import bottle3 from "../../assets/Icons/bottles-3.jpg";

function OurMission() {
  return (
    <section className="our-mission">
      <div className="our-mission__container">
        {/* Image on the left */}
        <div className="our-mission__image-container">
          <img
            src={bottle3}
            alt="skincare image"
            className="our-mission__image"
          />
        </div>

        {/* Text content on the right */}
        <div className="our-mission__content-container">
          <h2 className="our-mission__headline">Our Mission</h2>
          <p className="our-mission__content">
            At Skintuition, we believe that understanding what goes into your
            skincare is the first step towards healthier, happier skin. Our
            mission is to empower you with the knowledge to decode ingredient
            lists, making it easier for you to make informed choices about the
            products you use every day. Whether you're scanning a product label
            or pasting an ingredient list, we're here to provide you with
            personalized insights tailored to your unique skin type. Let's embark
            on this journey to better skin together!
          </p>
          <div className="our-mission__cta">
            <p>Ready to take control of your skincare routine?</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurMission;