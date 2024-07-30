import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { Link } from 'react-scroll';
import '../styles/About.css'; // Import the CSS file
import { BsFillPlayCircleFill } from "react-icons/bs";
import back from '../assets/about-background.png';
import image1 from '../assets/about.jpeg'; // Replace with your actual image paths
import image2 from '../assets/about1.avif';
import image3 from '../assets/b.jpg';
import image4 from '../assets/j.jpg';
import image5 from '../assets/us.webp';

const AboutContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #FFCCCC; /* Pastel pink background */
`;

const TextContainer = styled(animated.div)`
  flex: 1;
  padding: 20px;
  font-family: 'Pacifico', cursive;
  color: #333;
`;

const images = [image1, image2, image3,image4,image5]; // Add more images as needed

const About = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true, // Only trigger the animation once
    threshold: 0.1, // Percentage of the element visible to trigger the animation
  });

  const imageProps = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translate3d(0,0,0)' : 'translate3d(-100px,0,0)',
    config: { tension: 200, friction: 20 }
  });

  const textProps = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translate3d(0,0,0)' : 'translate3d(100px,0,0)',
    config: { tension: 200, friction: 20 }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <AboutContainer ref={ref}>
      <div className="about-section-image-container" style={imageProps}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className={`${index === currentImage ? 'active' : ''} ${index === 0 ? 'image1' : index === 1 ? 'image2' : 'image3'}`}
          />
        ))}
      </div>
      <TextContainer style={textProps}>
        <div className='text-aboutdiv'>
          <h1>About Us</h1>
          <p>
            Welcome to our eCommerce website, where we empower women homemakers and entrepreneurs through beautifully crafted handicrafts. Each item is unique and tells a story of dedication and skill.
          </p>
          <p>
            With a blend of creativity, attention to detail, and a commitment to surpassing expectations, our team enables you to explore the intersection of style and functionality with us!
          </p>
          <Link to="services" smooth={true} duration={1000}>
            <button className='know-more-button'>Know More</button>
          </Link>
        </div>
      </TextContainer>
    </AboutContainer>
  );
}

export default About;
