import "./Header.scss";
import brandLogo from "../../assets/logos/Skintuition-removebg-preview.png";
import heroImg from "../../assets/Icons/hero_img.jpg";

function Header() {
  return (
    <>
      <div className="header">
        <div className="header__left">
          <img className="header__logo" src={brandLogo} alt="Brand Logo" />
        </div>
        <div className="header__nav">
          <button className="header__button">Profile</button>
          <button className="header__button">Favorites</button>
          <button className="header__button">Glossary</button>
          <button className="header__button">About Us</button>
          <button className="header__button">Skin Quiz</button>
        </div>
      </div>
      <div className="header__hero--container">
        <div className="header__hero">
          <h1 className="header__hero--title">Skintuition</h1>
          <h2 className="header__hero--sub">Unlock the Secrets to Your Skin: Decode Your Ingredients.</h2>
          <h3 className="header__hero--info">Effortlessly analyze skincare ingredients and discover what's best for your skin.</h3>
        </div>
        <img className="header__img" src={heroImg} alt="Hero Image" />
      </div>
    </>
  );
}

export default Header;
