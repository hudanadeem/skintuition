import "./Header.scss";
import brandLogo from "../../assets/logos/skintuition_logo.png";
import heroImg from "../../assets/Icons/hero_img.jpg";
import profileIcon from "../../assets/Icons/user.png";

function Header() {
  return (
    <>
      <div className="header">
        <div className="header__left">
          <img className="header__logo" src={brandLogo} alt="Brand Logo" />
        </div>
        <div className="header__nav">
          <button className="header__button" role="button">
            Glossary
          </button>
          <button className="header__button" role="button">
            Our Story
          </button>
          <button className="header__button" role="button">
            Skin Quiz
          </button>
          <button className="header__button" role="button">
            <img
              className="header__profile"
              src={profileIcon}
              alt="Profile Icon"
            />
          </button>
        </div>
      </div>
      <div className="header__hero--container">
        <div className="header__hero">
          <h1 className="header__hero--title">Skintuition</h1>
          <h2 className="header__hero--sub">
            Unlock the Secrets to Your Skin: Decode Your Ingredients.
          </h2>
        </div>
        <div className="header__img-container">
          <div className="header__img">
            <img src={heroImg} alt="Hero Image" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
