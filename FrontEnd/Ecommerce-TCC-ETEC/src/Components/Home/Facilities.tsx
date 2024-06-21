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
    <div className="w-full bg-[#DDDDDD] py-14">
      <div className="flex items-center justify-evenly w-4/5 mx-auto">
        {
          facilitiesItemsInfo.map((facility) => (
            <div className="flex items-center gap-4 text-black" key={facility.title}>
              {facility.icon}
              <div>
                <h3 className="text-xl font-bold">{facility.title}</h3>
                <p className="font-medium text-neutral-400">{facility.text}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Facilities;