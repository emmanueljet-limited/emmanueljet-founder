/**
 * Component presenting the about section card including a highlight video,
 * professional title, and background overview description.
 *
 * @returns The rendered Jet about card element.
 */
const JetAbout = () => {
  return (
    <div className='flex min-w-0 flex-col items-center text-center lg:max-w-xs lg:items-end lg:text-right xl:max-w-sm'>
      <div className='overflow-hidden rounded-2xl border border-white/15 shadow-2xl shadow-purple-950/20'>
        <video
          src='/hero-video.mp4'
          autoPlay
          muted
          loop
          playsInline
          aria-label='Showcase preview video'
          className='h-auto w-full max-w-65 sm:max-w-75 md:max-w-85 lg:max-w-90 xl:max-w-100'
          width={400}
          height={400}
        />
      </div>

      <div className='mt-4 sm:mt-5'>
        <h2 className='text-xs font-bold tracking-wider uppercase text-white sm:text-sm md:text-base'>
          AN INNOVATIVE{' '}
          <span className='bg-linear-to-r from-purple-400 to-amber-300 bg-clip-text text-transparent'>
            WEB AND BLOCKCHAIN ENGINEER.
          </span>
        </h2>

        <p className='mt-2.5 text-xs leading-relaxed text-neutral-300 sm:text-sm lg:text-sm xl:text-base'>
          He specializes in crafting robust backend systems with Laravel and
          Node.js, developing secure smart contracts, and integrating
          cutting-edge AI. Passionate about transforming complex challenges into
          elegant solutions, JET is dedicated to sharing knowledge and empowering
          the global tech community.
        </p>
      </div>
    </div>
  );
};

export default JetAbout;
