import React from 'react';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';

import image1 from '../assets/test.jpeg';
import image2 from '../assets/test1.jpg';
import image3 from '../assets/test3.jpg';

const testimonials = [
  {
    id: 1,
    name: 'Jane Smith',
    title: 'CEO, J&S',
    quote: 'This is the best service I have ever used. Highly recommend!',
    image: image1
  },
  {
    id: 2,
    name: 'Rohan Rao',
    title: 'Marketing Head, Business',
    quote: 'Absolutely wonderful experience! Great support and results.',
    image: image2
  },
  {
    id: 3,
    name: 'Shaily Ganguly',
    title: 'Developer, TechCorp',
    quote: 'Fantastic! Will use again for sure! Best Products!',
    image: image3
  }
];

const TestimonialPage = () => {
  return (
    <Container>
      <Header>What Our Clients Say</Header>
      <TestimonialList>
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </TestimonialList>
    </Container>
  );
};

const TestimonialCard = ({ testimonial }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Animation triggers only once
    threshold: 0.1 // Trigger when 10% of the card is visible
  });

  const animationProps = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    config: { tension: 280, friction: 60 }
  });

  return (
    <animated.div style={animationProps} ref={ref}>
      <Card>
        <Image src={testimonial.image} alt={testimonial.name} />
        <Quote>{testimonial.quote}</Quote>
        <Name>{testimonial.name}</Name>
        <Title>{testimonial.title}</Title>
      </Card>
    </animated.div>
  );
};

const Container = styled.div`
  background: #FFE4E1;
  padding: 50px 20px;
  text-align: center;
`;

const Header = styled.h1`
  font-size: 2.5rem;
  color: #343a40;
  margin-bottom: 30px;
  position: relative;
  display: inline-block;
  &:after {
    content: '';
    display: block;
    width: 60%;
    height: 4px;
    background: #ffb6c1;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -10px;
  }
`;

const TestimonialList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const Card = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  padding: 20px;
  text-align: center;
  transition: transform 0.3s;
  &:hover {
    transform: translateY(-10px);
  }
`;

const Image = styled.img`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
`;

const Quote = styled.p`
  font-style: italic;
  color: #666;
  margin-bottom: 20px;
`;

const Name = styled.h2`
  font-size: 1.25rem;
  color: #343a40;
  margin-bottom: 5px;
`;

const Title = styled.h3`
  font-size: 1rem;
  color: #ffb6c1;
  margin: 0;
`;

export default TestimonialPage;
