import heroImg from "../../assets/icons/hero_img.jpg";
import "./Hero.scss";

function Hero() {
  return (
    <div className="hero">
      <div className="hero__text">
        <h1 className="hero__title">Skintuition</h1>
        <h2 className="hero__sub">
          Unlock the Secrets to Your Skin: Decode Your Ingredients.
        </h2>
      </div>
      <div className="hero__image">
        <img src={heroImg} alt="Hero Image" />
      </div>
    </div>
  );
}

export default Hero;
