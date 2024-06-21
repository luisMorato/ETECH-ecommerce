const Banner = () => {
  return (
    <section className="relative">
      <div className="absolute top-1/2 -translate-y-1/2 left-40 z-10">
        <h3 className="text-neutral-400/70 text-5xl font-semibold mb-2">High Quality Virtual Glasses</h3>
        <h2 className="text-[#2295E9] text-6xl font-bold mb-2">3D DayDream View</h2>
        <span className="flex items-end gap-5">
          <p className="text-neutral-400/70 text-4xl font-semibold">Starting At</p>
          <h3 className="text-6xl text-black font-bold tracking-wide">$890,90</h3>
        </span>
      </div>
        <div>
            <img 
              src="/Images/top-view-virtual-reality-simulator-with-headphones.jpg" 
              alt="virtual Reality glasses" 
              className="relative w-full h-[750px]"
            />
        </div>
    </section>
  )
}

export default Banner;