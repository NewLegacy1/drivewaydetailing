import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Hero from './Hero';
import ReviewsStrip from './ReviewsStrip';
import HeroVideo from './HeroVideo';
import ProblemSolution from './ProblemSolution';
import BeforeAfterSlider from './BeforeAfterSlider';
import Services from './Services';
import WhyChooseUs from './WhyChooseUs';
import ServiceAreas from './ServiceAreas';
import Gallery from './Gallery';
import { isCitySlug, getCityName } from '../lib/cities';

interface CityPageProps {
  onRequestQuote?: () => void;
}

const CityPage: React.FC<CityPageProps> = ({ onRequestQuote }) => {
  const { city } = useParams<{ city: string }>();
  if (!city || !isCitySlug(city)) return <Navigate to="/" replace />;

  const cityName = getCityName(city);

  useEffect(() => {
    document.title = `Mobile Detailing ${cityName} | Ceramic Coating & Paint Correction | ShowRoom AutoCare`;
    const metaDesc = document.querySelector('meta[name="description"]');
    const prev = metaDesc?.getAttribute('content') ?? '';
    const description = `Mobile car detailing ${cityName}. We come to you for ceramic coating, paint correction & interior detailing. Premium mobile detailing ${cityName} and GTA. Free quote.`;
    if (metaDesc) metaDesc.setAttribute('content', description);
    return () => { if (metaDesc) metaDesc.setAttribute('content', prev); };
  }, [cityName]);

  return (
    <>
      <Hero onRequestQuote={onRequestQuote} city={cityName} />
      <ReviewsStrip />
      <HeroVideo />
      <ProblemSolution city={cityName} />
      <BeforeAfterSlider />
      <Services onRequestQuote={onRequestQuote} />
      <WhyChooseUs city={cityName} />
      <ServiceAreas onRequestQuote={onRequestQuote} city={cityName} />
      <Gallery />
    </>
  );
};

export default CityPage;
