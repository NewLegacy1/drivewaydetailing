import React from 'react';
import Hero from './Hero';
import ReviewsStrip from './ReviewsStrip';
import HeroVideo from './HeroVideo';
import ProblemSolution from './ProblemSolution';
import Services from './Services';
import WhyChooseUs from './WhyChooseUs';
import ServiceAreas from './ServiceAreas';
import Gallery from './Gallery';
import FaqSection from './FaqSection';

interface HomePageProps {
  onRequestQuote?: () => void;
}

const HOME_HERO_SEED = 'homepage';

const HomePage: React.FC<HomePageProps> = ({ onRequestQuote }) => (
  <>
    <Hero onRequestQuote={onRequestQuote} layoutSeed={HOME_HERO_SEED} />
    <ReviewsStrip />
    <HeroVideo />
    <ProblemSolution />
    <Services onRequestQuote={onRequestQuote} />
    <WhyChooseUs />
    <ServiceAreas />
    <FaqSection />
    <Gallery />
  </>
);

export default HomePage;
