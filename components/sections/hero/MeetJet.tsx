/**
 * Component displaying the headline introduction text for Emmanuel Jet.
 *
 * @returns The rendered Meet Jet title block element.
 */
const MeetJet = () => {
  return (
    <div className='flex shrink-0 flex-col items-center select-none lg:items-start'>
      <p className='m-0 text-xs font-bold tracking-[0.3em] text-neutral-300 sm:text-sm md:text-base lg:text-lg'>
        MEET
      </p>

      <h1 className='blink m-0 text-7xl font-black leading-[0.85] tracking-tight text-transparent [-webkit-text-stroke:1.5px_white] sm:text-8xl sm:[-webkit-text-stroke:2px_white] md:text-9xl lg:text-[10rem] xl:text-[13rem] 2xl:text-[15rem]'>
        JET
      </h1>
    </div>
  );
};

export default MeetJet;
