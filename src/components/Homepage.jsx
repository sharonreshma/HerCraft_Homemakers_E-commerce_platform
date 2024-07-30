import React, { useRef } from 'react';
import '../styles/Homepage.css';
import { FiArrowRight } from 'react-icons/fi';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import BannerImage1 from '../assets/flower.png';
import BannerImage2 from '../assets/bask.png';
import BannerImage3 from '../assets/cand.avif';
import BannerImage4 from '../assets/cup.png';
import ProductCategories from './Category'; // Assuming this is the file name for the category page component

const Home = () => {
  const categoryRef = useRef(null);

  const handleScroll = () => {
    categoryRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home-container">
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <Carousel
            showThumbs={false}
            autoPlay
            infiniteLoop
            showStatus={false}
            showIndicators={false}
          >
            <div className="banner-slide-1">
              <img src={BannerImage1} alt="Banner 1" className="banner-image-1"/>
            </div>
            <div className="banner-slide-2">
              <img src={BannerImage2} alt="Banner 2" className="banner-image-2"/>
            </div>
            <div className="banner-slide-3">
              <img src={BannerImage3} alt="Banner 3" className="banner-image-3"/>
            </div>
            <div className="banner-slide-4">
              <img src={BannerImage4} alt="Banner 4" className="banner-image-4"/>
            </div>
          </Carousel>
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            Exclusively Crafted Creations!
          </h1>
          <p className="primary-text">
            Discover "Her Hands, Her Craft"—a curated collection of unique, handcrafted treasures by talented women homemakers.
          </p>
          <button className="secondary-button" onClick={handleScroll}>
            <a>Get Started </a>
            <FiArrowRight />
          </button>
        </div>
      </div>
      <div ref={categoryRef}>
        <ProductCategories />
      </div>
    </div>
  );
};

export default Home;
