/**
 * Decorative meter in the lower-left of the Hero section:
 * a thin horizontal rail with a small marker that glides along it
 * from left to right, and five tick marks beneath (the centre tick
 * is the tallest).
 *
 * Purely visual, so it is hidden from assistive technology.
 * The animation is disabled for users who prefer reduced motion.
 *
 * @returns The rendered meter element.
 */
const HeroScrollMeter = () => {
  return (
    <div
      aria-hidden='true'
      className='pointer-events-none absolute bottom-6 left-4 hidden text-white sm:left-6 lg:bottom-8 lg:left-12 lg:block'
    >
      <svg
        width='178'
        height='32'
        viewBox='0 0 178 32'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='block'
      >
        <style>{`
          @keyframes hero-meter-slide {
            from { transform: translateX(-13px); }
            to   { transform: translateX(142px); }
          }
          .hero-meter-marker {
            animation: hero-meter-slide 3.5s ease-in-out infinite alternate;
          }
          @media (prefers-reduced-motion: reduce) {
            .hero-meter-marker { animation: none; }
          }
        `}</style>

        {/* Rail */}
        <line
          x1='0'
          y1='8'
          x2='178'
          y2='8'
          stroke='currentColor'
          strokeWidth='1'
        />

        {/* Marker gliding along the rail */}
        <path
          className='hero-meter-marker'
          d='M13 8 L16 6.5 H19.5 L21 3.5 H28 L29.5 6.5 H33 L36 8 Z'
          fill='currentColor'
        />

        {/* Ticks */}
        <g stroke='currentColor' strokeWidth='1' strokeLinecap='round'>
          <line x1='62' y1='17' x2='62' y2='23' />
          <line x1='75' y1='17' x2='75' y2='23' />
          <line x1='87' y1='17' x2='87' y2='30' />
          <line x1='98' y1='17' x2='98' y2='23' />
          <line x1='110' y1='17' x2='110' y2='23' />
        </g>
      </svg>
    </div>
  );
};

export default HeroScrollMeter;