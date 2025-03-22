import { useEffect, useRef } from "react";
import "./BrandCarousel.scss";

// Static image imports (you can also dynamically require if needed)
import brand1 from "../../assets/images/the-ordinary.png";
import brand2 from "../../assets/images/cerave.png";
import brand3 from "../../assets/images/tatcha.png";
import brand4 from "../../assets/images/drunk-elephant.png";
import brand5 from "../../assets/images/glossier.png";
import brand6 from "../../assets/images/paulas-choice.png";
import brand7 from "../../assets/images/la-mer.png";
import brand8 from "../../assets/images/skinceuticals.png";
import brand9 from "../../assets/images/sundayriley.png";
import brand10 from "../../assets/images/kiehls.png";

const brandImages = [
  brand1,
  brand2,
  brand3,
  brand4,
  brand5,
  brand6,
  brand7,
  brand8,
  brand9,
  brand10,
];

function BrandCarousel() {
  const carouselRef = useRef(null);

  useEffect(() => {
    const scrollAmount = 1; // pixels per step
    const intervalSpeed = 40; // ms per step (lower = faster)
    const track = carouselRef.current;

    const scrollInterval = setInterval(() => {
      if (track) {
        // If we're at the end, reset to start
        if (track.scrollLeft + track.clientWidth >= track.scrollWidth) {
          track.scrollTo({ left: 0, behavior: "auto" });
        } else {
          track.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      }
    }, intervalSpeed);

    return () => clearInterval(scrollInterval); // Cleanup on unmount
  }, []);

  return (
    <div className="brand-carousel">
      <div className="brand-carousel__track" ref={carouselRef}>
        {brandImages.map((imgSrc, index) => (
          <div key={index} className="brand-logo">
            <img src={imgSrc} alt={`Brand ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrandCarousel;
