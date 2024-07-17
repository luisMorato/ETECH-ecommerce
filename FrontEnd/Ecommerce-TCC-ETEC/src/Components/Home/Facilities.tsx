import { useMemo } from "react";

import { LiaShippingFastSolid } from "react-icons/lia";
import { FaHeadset } from "react-icons/fa6";
import { BsCreditCard2Front } from "react-icons/bs";
import { CiDiscount1 } from "react-icons/ci";

type facilitiesItemsInfoProps = {
  title: string,
  text: string,
  icon: React.ReactElement
}

const Facilities = () => {
  const facilitiesItemsInfo: facilitiesItemsInfoProps[] = useMemo(() => [
    {
      title: "Free Shipping",
      text: "From All Orders Over $100",
      icon: <LiaShippingFastSolid size={30} />
    },
    {
      title: "Suppport 27/7",
      text: "Shop With an Expert",
      icon: <FaHeadset size={30} />
    },
    {
      title: "Secure Payments",
      text: "100% Protected Payments",
      icon: <BsCreditCard2Front size={30} />
    },
    {
      title: "Affordable Prices",
      text: "Get a Factory Direct Price",
      icon: <CiDiscount1 size={40} />
    },
  ], []);
  
  return (
    <div className="w-full bg-[#DDDDDD] py-7 md:py-14">
      <div className="flex flex-col gap-5 items-center justify-evenly w-4/5 mx-auto
      md:flex-row
      md:gap-5
      md:max-xl:w-full
      md:max-xl:px-2">
        {
          facilitiesItemsInfo.map((facility) => (
            <div 
              className="flex items-center justify-center gap-4 text-black border-b border-b-neutral-500 last:border-b-0 pb-5 w-full
              sm:w-3/5
              md:pb-0
              md:border-none" 
              key={facility.title}
            >
              {facility.icon}
              <div>
                <h3 className="text-xl font-bold text-nowrap md:text-base xl:text-xl">{facility.title}</h3>
                <p className="font-medium text-neutral-400 md:text-sm xl:text-base">{facility.text}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Facilities;