import { useMemo } from "react";

const News = () => {
  const newsData = useMemo(() => [
    {id: 1,imgSrc: '/Images/wind-farms-fields.jpg'},
    {id: 2,imgSrc: '/Images/futuristic-computer-lab-equipment-row-generated-by-ai.jpg'},
    {id: 3,imgSrc: '/Images/ai-chip-artificial-intelligence-future-technology-innovation.jpg'},
  ], []);
  
  return (
    <div 
      id="news" 
      className="my-10 flex flex-col mx-auto w-4/5
      md:max-xl:w-full"
    >
        <h2 className="text-3xl text-black font-medium mb-5 md:max-xl:ml-5">Our Latest News</h2>
        <div 
          className="flex flex-col justify-center gap-10 self-center
          md:max-xl:flex-wrap
          md:flex-row
          md:flex-1"
        >
          {newsData.map((news) => (
            <div
              key={news.id}
              className="flex flex-col cursor-pointer bg-white text-black rounded-2xl overflow-hidden h-[500px] w-[320px]
              lg:w-[380px]"
            >
              <div className="flex items-start h-[220px] sm:h-[250px]">
                <img
                  src={news.imgSrc}
                  alt="wind-farms-fields" 
                  className="flex-1 h-full"
                />
              </div>
              <div className="ml-7 mt-5">
                <h2 className="text-3xl font-medium mb-5">Lorem ipsum dolor</h2>
                <p className="w-[90%]">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime, nobis at. Voluptas illum consectetur vero, voluptatibus deleniti adipisci quod accusantium maxime, similique quae molestias explicabo, at ab modi voluptate fugit.</p>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default News;