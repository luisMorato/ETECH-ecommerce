import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { FaShippingFast } from "react-icons/fa";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";

import HardwareSubCategory from "./HardwareSubCategory";
import PerfipheralSubCategory from "./PerfipheralSubCategory";
import ComputerSubCategory from "./ComputerSubCategory";
import NoteBookSubCategory from "./NoteBookSubCategory";
import MonitorsSubCategory from "./MonitorsSubCategory";
import Brands from "./Brands";


import { captilze } from "../../../utils/captalize";

interface SideBarProps {
  category: string;
  setPriceInterval: Dispatch<SetStateAction<number>>,
  priceInterval: number
}

const SideBar = ({ category, setPriceInterval, priceInterval }: SideBarProps) => {
  const [freeShipping, setFreeShipping] = useState(false);

  //Handle the Change of the Price Range Input
  const handlePriceInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPriceInterval(parseFloat(e.target.value))
  } 

  //Remove All Filters, such as SubCategory | Brands | Free Shipping | Price Interval
  const clearFilters = () => {
    const currentUrl = new URL(window.location.toString());
    currentUrl.searchParams.delete('subcategory');
    currentUrl.searchParams.delete('brand');
    window.history.pushState(null, '', currentUrl);
    window.location.reload();
    setPriceInterval(5);
  }

  return (
    <aside className="flex flex-col flex-1 bg-white text-black w-[250px] max-w-[250px] pt-5">
      <h2 className="text-2xl text-black font-medium pl-3">Filters</h2>
      <div className="flex items-center justify-center px-3 border-b border-b-neutral-400 mb-3 w-[90%] mx-auto">
        <div className="flex items-center py-2 px-4 my-3 border border-neutral-400 rounded-full">
          <div className="flex gap-2 items-center mr-8">
            <FaShippingFast size={25} className="text-[#2295E9]" />
            <span className="text-nowrap font-medium">Free Shipping</span>
          </div>
          <button onClick={() => (setFreeShipping((prevValue) => !prevValue))}>
            {!freeShipping ?
              <BsToggleOff size={25} />
              :
              <BsToggleOn size={25} />
            }
          </button>
        </div>
      </div>
      <div className="relative flex flex-col px-3 mb-5">
        <div className="flex items-center justify-between">
          <p className="text-xl text-black font-medium mt-1 mb-2">Price</p>
          <button
            onClick={clearFilters}
            className="hover:text-neutral-400 text-sm"
          >
            Clear
          </button>
        </div>
        <p className="text-black font-medium mt-1 mb-3">Price Interval</p>
        <input 
          type="range" 
          className="flex-1 appearance-none bg-[#D9D9D9] rounded-lg outline-none
            [&::-webkit-slider-thumb]:w-3
            [&::-webkit-slider-thumb]:h-3
            [&::-webkit-slider-thumb]:shadow-[0_0_0_1px_#2295E9]
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:bg-[#2295E9]
            [&::-webkit-slider-thumb]:rounded-full"
          min={5}
          max={20000}
          onChange={(e) => handlePriceInputChange(e)}
        />
        <div className="flex justify-between mt-1">
          <span>R${priceInterval}</span>
          <span>R$20000</span>
        </div>
      </div>
      <div className="px-3">
        <h2 className="text-xl font-medium">{captilze(category as string)}</h2>
        <div className="pl-3 mb-3 pb-3 border-b border-b-neutral-300">
          <p className="text-black font-medium mt-1 mb-2">SubCategories</p>
          {category === 'hardware' && <HardwareSubCategory />}
          {category === 'peripherals' && <PerfipheralSubCategory />}
          {category === 'monitors' && <MonitorsSubCategory />}
          {category === 'computers' && <ComputerSubCategory />}
          {category === 'notebooks' && <NoteBookSubCategory />}
        </div>
        <div className="pl-3 mb-3 border-b border-b-neutral-300">
          <p className="text-black font-medium mb-2">Brands</p>
          <Brands />
        </div>
      </div>
    </aside>
  )
}

export default SideBar;