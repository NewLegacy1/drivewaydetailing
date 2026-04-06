import React from 'react';
import Hero from './Hero';
import ReviewsStrip from './ReviewsStrip';
import ProblemSolution from './ProblemSolution';
import BeforeAfterSlider from './BeforeAfterSlider';
import Services from './Services';
import ServiceAreas from './ServiceAreas';
import FaqSection from './FaqSection';

const HOME_HERO_SEED = 'homepage';

/**
 * Trimmed homepage order for paid traffic: proof → problem → transformation → offer → area → objections.
 * No new copy; omits long browse sections (video, gallery, extra trust grid).
 */
interface MobileDetailingLpProps {
  onRequestQuote?: () => void;
}

const MobileDetailingLp: React.FC<MobileDetailingLpProps> = ({ onRequestQuote }) => (
  <>
    <Hero onRequestQuote={onRequestQuote} layoutSeed={HOME_HERO_SEED} noHeaderOffset />
    <ReviewsStrip />
    <ProblemSolution />
    <BeforeAfterSlider />
    <Services onRequestQuote={onRequestQuote} />
    <ServiceAreas />
    <FaqSection />
  </>
);

export default MobileDetailingLp;
