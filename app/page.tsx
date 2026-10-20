import Hero from '@/components/sections/Hero';
import Navbar from '@/components/layout/Navbar';

/**
 * Portfolio homepage displaying the top navigation bar,
 * the hero section, and ambient background lighting.
 *
 * @returns The rendered Home page element.
 */
const Home = () => {
  return (
    <>
      <Navbar />
      <main className='flex flex-1 flex-col justify-center'>
        <Hero />
      </main>

      <div className='pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,#ffffff21_0%,transparent_60%)]' />
    </>
  );
};

export default Home;
