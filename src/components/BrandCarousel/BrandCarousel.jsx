import { useEffect, useRef } from "react";
import "./BrandCarousel.scss";
import brand1 from "../../assets/logos/the-ordinary.png";
import brand2 from "../../assets/logos/cerave.png";
import brand3 from "../../assets/logos/elf.png";
import brand4 from "../../assets/logos/la-roche.png";
import brand5 from "../../assets/logos/glossier.png";
import brand6 from "../../assets/logos/paulas-choice.png";
import brand7 from "../../assets/logos/la-mer.png";
import brand8 from "../../assets/logos/dr-ceuracle.webp";
import brand9 from "../../assets/logos/sundayriley.png";
import brand10 from "../../assets/logos/kiehls.png";

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

const brandLinks = [
  "https://theordinary.com/",
  "https://www.cerave.com/",
  "https://www.elfcosmetics.com/",
  "https://www.laroche-posay.us/",
  "https://www.glossier.com/",
  "https://www.paulaschoice.com/",
  "https://www.cremedelamer.com/",
  "https://www.drceuracle.com/",
  "https://www.sundayriley.com/",
  "https://www.kiehls.com/",
];

const brandItems = brandImages.map((img, index) => ({
  image: img,
  link: brandLinks[index],
}));

function BrandCarousel() {
  const carouselRef = useRef(null);

  useEffect(() => {
    const scrollAmount = 2.5;
    const intervalSpeed = 20;
    const track = carouselRef.current;

    const scrollInterval = setInterval(() => {
      if (track) {
        if (track.scrollLeft >= track.scrollWidth / 2) {
          track.scrollLeft = 0;
        } else {
          track.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      }
    }, intervalSpeed);

    return () => clearInterval(scrollInterval);
  }, []);

  const fullBrandList = [
    ...brandItems,
    ...brandItems,
    ...brandItems,
    ...brandItems,
    ...brandItems,
    ...brandItems,
  ];

  return (
    <div className="carousel">
      <div className="carousel__container" ref={carouselRef}>
        {fullBrandList.map((item, index) => (
          <div key={index} className="carousel__logo">
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <img src={item.image} alt="Brand Logo" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrandCarousel;
