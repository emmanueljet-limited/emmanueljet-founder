import MeetJet from '@/components/sections/hero/MeetJet';
import JetImg from '@/components/sections/hero/JetImg';
import JetAbout from '@/components/sections/hero/JetAbout';
import HeroScrollMeter from '@/components/sections/hero/HeroScrollMeter';

/**
 * Main Hero section component composed of the Meet Jet headline,
 * portrait illustration, about summary card, and a decorative meter.
 *
 * @returns The rendered Hero section element.
 */
const Hero = () => {
  return (
    <section
      aria-label='Hero section'
      className='relative mx-auto flex w-full flex-col items-center justify-between gap-10 px-4 pt-6 pb-12 sm:px-6 sm:pt-8 sm:pb-16 md:gap-12 md:px-8 md:pt-12 lg:flex-row lg:items-center lg:gap-6 lg:px-12 lg:pt-14 lg:pb-20 xl:gap-8'
    >
      <MeetJet />
      <JetImg />
      <JetAbout />
      <HeroScrollMeter />
    </section>
  );
};

export default Hero;