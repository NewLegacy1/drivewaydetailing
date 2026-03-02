import React from 'react';
import Hero from './Hero';
import ReviewsStrip from './ReviewsStrip';
import HeroVideo from './HeroVideo';
import ProblemSolution from './ProblemSolution';
import BeforeAfterSlider from './BeforeAfterSlider';
import Services from './Services';
import WhyChooseUs from './WhyChooseUs';
import ServiceAreas from './ServiceAreas';
import Gallery from './Gallery';

interface HomePageProps {
  onRequestQuote?: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onRequestQuote }) => (
  <>
    <Hero onRequestQuote={onRequestQuote} />
    <ReviewsStrip />
    <HeroVideo />
    <ProblemSolution />
    <BeforeAfterSlider />
    <Services onRequestQuote={onRequestQuote} />
    <WhyChooseUs />
    <ServiceAreas onRequestQuote={onRequestQuote} />
    <Gallery />
  </>
);

export default HomePage;
