import Image from 'next/image';

/**
 * Component rendering the visual portrait illustration of Emmanuel Jet
 * with responsive dimensions, ambient background glow, and interactive hover scaling.
 *
 * @returns The rendered image container element.
 */
const JetImg = () => {
  return (
    <div className='relative flex min-w-0 flex-1 items-center justify-center'>
      <div
        className='pointer-events-none absolute inset-0 -z-10 flex items-center justify-center'
        aria-hidden='true'
      >
        <div className='h-48 w-48 rounded-full bg-purple-600/20 blur-3xl sm:h-64 sm:w-64 md:h-80 md:w-80' />
      </div>

      <Image
        src='/emmanuel-jet.svg'
        alt='Portrait illustration of Emmanuel Jet'
        width={800}
        height={800}
        priority
        className='h-auto w-full max-w-60 object-contain transition-transform duration-500 ease-in-out hover:scale-105 hover:cursor-pointer sm:max-w-75 md:max-w-95 lg:max-w-110 xl:max-w-125'
      />
    </div>
  );
};

export default JetImg;
