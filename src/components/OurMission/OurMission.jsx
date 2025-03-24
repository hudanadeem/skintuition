import { useEffect, useRef, useState } from "react";
import "./OurMission.scss";
import bottle3 from "../../assets/images/our-mission.jpg";
import { Link } from "react-router-dom";

function OurMission() {
  const imageRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="mission">
      <div className="mission__container">
        <div className="mission__image--container">
          <img
            ref={imageRef}
            src={bottle3}
            alt="skincare image"
            className={`mission__image ${isVisible ? "slide-in" : ""}`}
          />
        </div>

        <div className="mission__content--container">
          <h2 className="mission__headline">Our Mission</h2>
          <p className="mission__content">
            At Skintuition, we believe that understanding what goes into your
            skincare is the first step towards healthier, happier skin. Our
            mission is to empower you with the knowledge to decode ingredient
            lists, making it easier for you to make informed choices about the
            products you use every day. We're here to provide you with
            personalized insights tailored to your unique skin type. Let's
            embark on this journey to better skin together!
          </p>
          <div className="mission__cta">
            <p>Ready to take control of your skincare routine?</p>
          </div>
          <Link to="/quiz" className="mission__cta--button">
            Start Now
          </Link>
        </div>
      </div>
    </section>
  );
}

export default OurMission;
