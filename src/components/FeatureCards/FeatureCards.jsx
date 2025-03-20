import "./FeatureCards.scss";
import card2Img from "../../assets/Icons/scan.jpg";
import card3Img from "../../assets/Icons/paste.jpg";
import card4Img from "../../assets/Icons/glossary.jpg";
import card1Img from "../../assets/Icons/analysis.jpg";

function FeatureCards() {
  return (
    <>
      <section className="core-functionality">
        <h2 className="core-functionality__headline">How Skintuition Works</h2>
        <div className="core-functionality__features">
          <article className="core-functionality__feature-card">
            <img
              className="core-functionality__feature-card__background"
              src={card1Img} 
              alt="Personalized Analysis"
            />
            <div className="core-functionality__feature-card__content">
              <h3 className="core-functionality__feature-card__title">
                Personalized Analysis
              </h3>
              <p className="core-functionality__feature-card__description">
                Receive tailored ingredient insights based on your unique skin
                type.
              </p>
              <button className="core-functionality__feature-card__button">
                Learn More
              </button>
            </div>
          </article>
          <article className="core-functionality__feature-card">
            <img
              className="core-functionality__feature-card__background"
              src={card2Img} 
              alt="Scan Ingredients"
            />
            <div className="core-functionality__feature-card__content">
              <h3 className="core-functionality__feature-card__title">
                Scan Ingredients
              </h3>
              <p className="core-functionality__feature-card__description">
                Effortlessly analyze ingredient lists by simply uploading a
                photo.
              </p>
              <button className="core-functionality__feature-card__button">
                Try it Now
              </button>
            </div>
          </article>
          <article className="core-functionality__feature-card">
            <img
              className="core-functionality__feature-card__background"
              src={card3Img} 
              alt="Paste Ingredients"
            />
            <div className="core-functionality__feature-card__content">
              <h3 className="core-functionality__feature-card__title">
                Paste Ingredients
              </h3>
              <p className="core-functionality__feature-card__description">
                Copy and paste ingredient lists directly for instant analysis.
              </p>
              <button className="core-functionality__feature-card__button">
                Analyze Now
              </button>
            </div>
          </article>
          <article className="core-functionality__feature-card">
            <img
              className="core-functionality__feature-card__background"
              src={card4Img} 
              alt="Comprehensive Glossary"
            />
            <div className="core-functionality__feature-card__content">
              <h3 className="core-functionality__feature-card__title">
                Comprehensive Glossary
              </h3>
              <p className="core-functionality__feature-card__description">
                Explore detailed information on thousands of skincare
                ingredients.
              </p>
              <button className="core-functionality__feature-card__button">
                Explore
              </button>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

export default FeatureCards;
