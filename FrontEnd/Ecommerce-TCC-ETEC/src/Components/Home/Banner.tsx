const Banner = () => {
  return (
    <section className="relative">
      <div 
        className="hidden absolute top-1/2 -translate-y-1/2 left-40 z-10
        min-[900px]:block
        min-[900px]:max-xl:left-10"
      >
        <h3 className="text-neutral-400/70 text-5xl font-semibold mb-2 md:max-xl:text-4xl">High Quality Virtual Glasses</h3>
        <h2 className="text-[#2295E9] text-6xl font-bold mb-2 md:max-xl:text-5xl">3D DayDream View</h2>
        <span className="flex items-end gap-5">
          <p className="text-neutral-400/70 text-4xl font-semibold md:max-xl:text-3xl">Starting At</p>
          <h3 className="text-6xl text-black font-bold tracking-wide md:max-xl:text-5xl">$890,90</h3>
        </span>
      </div>
      <div>
          <picture>
            <source
              srcSet="/Images/top-view-arrangement-with-vr-glasses.jpg" 
              media="(max-width: 900px)" 
              type="image/png"
            />
            <img
              src="/Images/top-view-virtual-reality-simulator-with-headphones.jpg" 
              alt="virtual Reality glasses"
              className="h-[350px] w-full
              min-[450px]:h-[450px]
              sm:h-[600px]
              lg:h-[550px]
              xl:h-[750px]"
            />
          </picture>
      </div>
    </section>
  )
}

export default Banner;