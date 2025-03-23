import { useEffect, useRef } from "react";
import "./BrandCarousel.scss";

// Static image imports
import brand1 from "../../assets/images/the_ordinary.png";
import brand2 from "../../assets/images/cerave.png";
import brand3 from "../../assets/images/elf.png";
import brand4 from "../../assets/images/la-roche.png";
import brand5 from "../../assets/images/glossier.png";
import brand6 from "../../assets/images/paulas-choice.png";
import brand7 from "../../assets/images/la-mer.png";
import brand8 from "../../assets/images/dr-ceuracle.webp";
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
    const scrollAmount = 2.5; // pixels per step
    const intervalSpeed = 20; // ms per step
    const track = carouselRef.current;

    const scrollInterval = setInterval(() => {
      if (track) {
        // Reset scroll when halfway through the duplicated list
        if (track.scrollLeft >= track.scrollWidth / 2) {
          track.scrollLeft = 0;
        } else {
          track.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      }
    }, intervalSpeed);

    return () => clearInterval(scrollInterval);
  }, []);

  // Duplicate the brand list to simulate infinite loop
  const fullBrandList = [
    ...brandItems,
    ...brandItems,
    ...brandItems,
    ...brandItems,
    ...brandItems,
    ...brandItems,
  ];

  return (
    <div className="brand-carousel">
      <div className="brand-carousel__track" ref={carouselRef}>
        {fullBrandList.map((item, index) => (
          <div key={index} className="brand-logo">
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <img
                src={item.image}
                alt={`Brand ${(index % brandItems.length) + 1}`}
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrandCarousel;
