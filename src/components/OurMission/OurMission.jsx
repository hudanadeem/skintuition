import { useEffect, useRef, useState } from "react";
import "./OurMission.scss";
import bottle3 from "../../assets/Icons/bottles-3.jpg";
import { Link } from "react-router-dom";

function OurMission() {
  const imageRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Optional: stop observing after it's visible
        }
      },
      { threshold: 0.4 } // Trigger when 40% of image is in view
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="our-mission">
      <div className="our-mission__container">
        <div className="our-mission__image-container">
          <img
            ref={imageRef}
            src={bottle3}
            alt="skincare image"
            className={`our-mission__image ${isVisible ? "slide-in" : ""}`}
          />
        </div>

        <div className="our-mission__content-container">
          <h2 className="our-mission__headline">Our Mission</h2>
          <p className="our-mission__content">
            At Skintuition, we believe that understanding what goes into your
            skincare is the first step towards healthier, happier skin. Our
            mission is to empower you with the knowledge to decode ingredient
            lists, making it easier for you to make informed choices about the
            products you use every day. Whether you're scanning a product label
            or pasting an ingredient list, we're here to provide you with
            personalized insights tailored to your unique skin type. Let's
            embark on this journey to better skin together!
          </p>
          <div className="our-mission__cta">
            <p>Ready to take control of your skincare routine?</p>
          </div>
          <Link to="/quiz" className="our-mission__cta-button">
            Start Now
          </Link>
        </div>
      </div>
    </section>
  );
}

export default OurMission;
