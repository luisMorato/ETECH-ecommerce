const News = () => {
  return (
    <div id="news" className="w-4/5 mx-auto my-10">
        <h2 className="text-3xl text-black font-medium mb-5">Our Latest News</h2>
        <div className="flex justify-center gap-10">

          <div className="flex flex-col cursor-pointer bg-white text-black w-[380px] h-[500px] rounded-2xl overflow-hidden">
            <div className="flex items-start w-full h-[250px]">
              <img 
                src="/Images/wind-farms-fields.jpg"
                alt="wind-farms-fields" 
                className="flex-1"
              />
            </div>
            <div className="ml-7 mt-5">
              <h2 className="text-3xl font-medium mb-5">Lorem ipsum dolor</h2>
              <p className="w-[90%]">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime, nobis at. Voluptas illum consectetur vero, voluptatibus deleniti adipisci quod accusantium maxime, similique quae molestias explicabo, at ab modi voluptate fugit.</p>
            </div>
          </div>

          <div className="flex flex-col cursor-pointer bg-white text-black w-[380px] h-[500px] rounded-2xl overflow-hidden">
            <div className="w-full h-[250px]">
              <img 
                src="/Images/futuristic-computer-lab-equipment-row-generated-by-ai.jpg"
                alt="futuristic-computer-lab" 
                className="h-full"
              />
            </div>
            <div className="ml-7 mt-5">
              <h2 className="text-3xl font-medium mb-5">Lorem ipsum dolor</h2>
              <p className="w-[90%]">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime, nobis at. Voluptas illum consectetur vero, voluptatibus deleniti adipisci quod accusantium maxime, similique quae molestias explicabo, at ab modi voluptate fugit.</p>
            </div>
          </div>

          <div className="flex flex-col cursor-pointer bg-white text-black w-[380px] h-[500px] rounded-2xl overflow-hidden">
            <div className="w-full h-[250px]">
              <img 
                src="/Images/ai-chip-artificial-intelligence-future-technology-innovation.jpg"
                alt="ai-chip-artificial-intelligence"
                className="w-full h-full"
              />
            </div>
            <div className="ml-7 mt-5">
              <h2 className="text-3xl font-medium mb-5">Lorem ipsum dolor</h2>
              <p className="w-[90%]">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime, nobis at. Voluptas illum consectetur vero, voluptatibus deleniti adipisci quod accusantium maxime, similique quae molestias explicabo, at ab modi voluptate fugit.</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default News;