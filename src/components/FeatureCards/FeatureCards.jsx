import { Link } from "react-router-dom";
import "./FeatureCards.scss";
import quizImg from "../../assets/Icons/drop.jpg"; // for Personalized Quiz
import scanImg from "../../assets/Icons/scan.jpg"; // for Scan Ingredients

function FeatureCards() {
  return (
    <>
      <section className="core-functionality">
        <div className="core-functionality__wrapper">
          
          <div className="core-functionality__intro">
            <h2 className="core-functionality__headline">
              How it Works
            </h2>
            <p className="core-functionality__description">
              Skintuition helps you find the best ingredients for your skin by
              following two simple steps:
            </p>
            <ul className="core-functionality__steps">
              <li>
                Take a personalized quiz to discover your skin type and
                concerns.
              </li>
              <li>
                Scan product ingredients to understand how they match your skin
                needs.
              </li>
            </ul>
            <p className="core-functionality__description">
              Together, these tools empower you to make smarter, skin-friendly
              choices every day.
            </p>
          </div>

          <div className="core-functionality__features">
            <article className="core-functionality__feature-card">
              <img
                className="core-functionality__feature-card__background"
                src={quizImg}
                alt="Personalized Quiz"
              />
              <div className="core-functionality__feature-card__content">
                <h3 className="core-functionality__feature-card__title">
                  Personalized Quiz
                </h3>
                <p className="core-functionality__feature-card__description">
                  Discover your skin type and get custom ingredient insights.
                </p>
                <Link
                  to="/quiz"
                  className="core-functionality__feature-card__button"
                >
                  Take the Quiz
                </Link>
              </div>
            </article>

            <article className="core-functionality__feature-card">
              <img
                className="core-functionality__feature-card__background"
                src={scanImg}
                alt="Scan Ingredients"
              />
              <div className="core-functionality__feature-card__content">
                <h3 className="core-functionality__feature-card__title">
                  Scan Ingredients
                </h3>
                <p className="core-functionality__feature-card__description">
                  Upload or scan any ingredient list to see what's right for
                  you.
                </p>
                <Link
                  to="/analysis"
                  className="core-functionality__feature-card__button"
                >
                  Try it Now
                </Link>
              </div>
            </article>
          </div>

        </div>
      </section>
    </>
  );
}

export default FeatureCards;
