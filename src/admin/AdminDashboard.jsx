import React, { useRef } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Cat from './Cat';
import '../styles/AdminDashboard.css';
import BannerImage1 from '../assets/flower.png';
import BannerImage2 from '../assets/bask.png';
import BannerImage3 from '../assets/cand.avif';
import BannerImage4 from '../assets/cup.png';

const AdminDashboard = () => {
  const categoryRef = useRef(null);

  const handleScroll = () => {
    categoryRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="admin-main">
      <div className="adminhome-banner-container">
        <div className="adminhome-bannerImage-container">
          <Carousel
            showThumbs={false}
            autoPlay
            infiniteLoop
            showStatus={false}
            showIndicators={false}
          >
            <div className="adminbanner-slide-1">
              <img src={BannerImage1} alt="Banner 1" className="banner-image-1"/>
            </div>
            <div className="adminbanner-slide-2">
              <img src={BannerImage2} alt="Banner 2" className="banner-image-2"/>
            </div>
            <div className="adminbanner-slide-3">
              <img src={BannerImage3} alt="Banner 3" className="banner-image-3"/>
            </div>
            <div className="adminbanner-slide-4">
              <img src={BannerImage4} alt="Banner 4" className="banner-image-4"/>
            </div>
          </Carousel>
        </div>
        <div className="adminhome-text-section">
          <h1 className="adminprimary-heading">
            Welcome to Your Admin Dashboard
          </h1>
          <p className="adminprimary-text">
            Manage your store efficiently with our tools and features. Navigate through the sidebar to access different functionalities.
          </p>
          <button className="adminsecondary-button" onClick={handleScroll}>
            <a href="#dashboard">Explore Dashboard</a>
            <FiArrowRight />
          </button>
        </div>
      </div>
      <div ref={categoryRef}>
        <Cat />
      </div>
    </div>
  );
};

export default AdminDashboard;
