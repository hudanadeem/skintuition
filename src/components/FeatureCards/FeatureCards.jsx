import { Link } from "react-router-dom";
import "./FeatureCards.scss";
import quizImg from "../../assets/images/drop.jpg";
import scanImg from "../../assets/images/scan.jpg";

function FeatureCards() {
  return (
    <>
      <section className="card">
        <div className="card__wrapper">
          <div className="card__intro">
            <h2 className="card__headline">How it Works</h2>
            <p className="card__description">
              Skintuition helps you find the best ingredients for your skin by
              following two simple steps:
            </p>
            <ul className="card__steps">
              <li>
                Take a personalized quiz to discover your skin type and
                concerns.
              </li>
              <li>
                Scan product ingredients to understand how they match your skin
                needs.
              </li>
            </ul>
            <p className="card__description">
              Together, these tools empower you to make smarter, skin-friendly
              choices every day.
            </p>
          </div>

          <div className="card__features">
            <article className="card__feature">
              <img
                className="card__feature__background"
                src={quizImg}
                alt="Personalized Quiz"
              />
              <div className="card__feature__content">
                <h3 className="card__feature__title">Personalized Quiz</h3>
                <p className="card__feature__description">
                  Discover your skin type and get custom ingredient insights.
                </p>
                <Link to="/quiz" className="card__feature__button">
                  Take the Quiz
                </Link>
              </div>
            </article>

            <article className="card__feature">
              <img
                className="card__feature__background"
                src={scanImg}
                alt="Scan Ingredients"
              />
              <div className="card__feature__content">
                <h3 className="card__feature__title">Scan Ingredients</h3>
                <p className="card__feature__description">
                  Upload or scan any ingredient list to see what's right for
                  you.
                </p>
                <Link to="/analysis" className="card__feature__button">
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
