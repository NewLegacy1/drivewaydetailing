import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Hero from './Hero';
import ReviewsStrip from './ReviewsStrip';
import HeroVideo from './HeroVideo';
import ProblemSolution from './ProblemSolution';
import Services from './Services';
import WhyChooseUs from './WhyChooseUs';
import ServiceAreas from './ServiceAreas';
import Gallery from './Gallery';
import FaqSection from './FaqSection';
import { isCitySlug, getCityName } from '../lib/cities';

interface CityPageProps {
  onRequestQuote?: () => void;
}

const CityPage: React.FC<CityPageProps> = ({ onRequestQuote }) => {
  const { city } = useParams<{ city: string }>();
  if (!city || !isCitySlug(city)) return <Navigate to="/" replace />;

  const cityName = getCityName(city);

  return (
    <>
      <Hero onRequestQuote={onRequestQuote} city={cityName} />
      <ReviewsStrip />
      <HeroVideo />
      <ProblemSolution city={cityName} />
      <Services onRequestQuote={onRequestQuote} />
      <WhyChooseUs city={cityName} />
      <ServiceAreas city={cityName} />
      <FaqSection />
      <Gallery />
    </>
  );
};

export default CityPage;
