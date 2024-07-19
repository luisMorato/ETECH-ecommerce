import {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useEffect,
    useState
} from "react";
import { 
    FaSearch, 
    FaShippingFast
} from "react-icons/fa";
import {
    BsToggleOff,
    BsToggleOn
} from "react-icons/bs";
import { FaFilterCircleXmark, FaX } from "react-icons/fa6";

import ListItem from "../../Layout/ListItem";
import Brands from "./Brands";

import { setUrlParam } from "../../../utils/SetUrlParam";

interface smallScreenFiltersProps {
    category: string,
    setPriceInterval: Dispatch<SetStateAction<number>>,
    priceInterval: number,
    setIsFilterModalOpen: Dispatch<SetStateAction<boolean>>,
    setSearch: Dispatch<SetStateAction<string>>,
    search: string,
    clearFilters: () => void
}

interface subcategories {
    id: number,
    name: string,
}

const SmallScreenFilters = ({ 
    category, 
    setPriceInterval, 
    priceInterval,
    setIsFilterModalOpen,
    setSearch,
    search,
    clearFilters
}: smallScreenFiltersProps) => {
    const [subcategories, setSubcategories] = useState<subcategories[]>();
    const [freeShipping, setFreeShipping] = useState(false);

    const currentUrl = new URL(window.location.toString());
    const currentSubCategory = currentUrl.searchParams.get('subcategory');
    const currentBrand = currentUrl.searchParams.get('brand') ?? '';
    
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    //Set the Brand in the URL State to Persist The Reloads
    const setBrand = (brand: string) => {
        currentUrl.searchParams.set('brand', brand);
        window.history.pushState(null, '', currentUrl);
        window.location.reload();
    }

    useEffect(() => {
        const fetchSubCategories = async () => {
            const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/categories/${category}`);

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                }
            });

            const resJson = await response.json();

            if(response.ok){
                const { categoryAndSubCategories } = resJson;
                setSubcategories(categoryAndSubCategories.subCategories);
            }
        }

        fetchSubCategories();
    }, [category]);
  
    return (
        <div className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20 text-black border border-neutral-400/70 bg-white w-[300px] max-h-[500px] font-medium p-3 space-y-3 overflow-y-scroll overflow-x-hidden rounded-xl">
            <div className="flex items-center justify-between border-b pb-2">
                <h2 className="text-xl">Filters</h2>
                <button
                    onClick={() => setIsFilterModalOpen(false)}
                    className="text-neutral-400 hover:text-black"
                >
                    <FaX size={15} />
                </button>
            </div>

            <div className="flex items-center gap-2 flex-1 text-neutral-400 border border-neutral-300 rounded-full py-1 px-2">
                <FaSearch size={20} />
                <input
                    type="text"
                    placeholder="Search For Something..."
                    onChange={(e) => handleSearch(e)}
                    value={search}
                    className="focus:outline-none flex-1 text-sm"
                />
            </div>

            <div className="flex justify-between">
                <div
                    className="flex border border-neutral-400 rounded-2xl py-0.5 px-2 text-neutral-400 text-sm text-nowrap font-medium hover:text-black hover:border-black w-fit shrink-0"
                >
                    <div className="flex gap-3 items-center">
                        <div className="flex gap-1 items-center">
                            <FaShippingFast size={20} className="text-mainBlue" />
                            <span className="text-nowrap font-medium">Free Shipping</span>
                        </div>
                        <button 
                            onClick={() => (setFreeShipping((prevValue) => !prevValue))}
                        >
                            {!freeShipping ?
                                <BsToggleOff size={25}/>
                            :
                                <BsToggleOn size={25} className="text-mainBlue"/>
                        }
                        </button>
                    </div>
                </div>
                <button
                    onClick={clearFilters}
                    className="text-neutral-400 hover:text-black"
                >
                    <FaFilterCircleXmark size={20} />
                </button>
            </div>
            
            <div className="flex flex-col flex-1">
                <p className="text-black font-medium mb-2">Price Interval</p>
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
                    onChange={(e) => setPriceInterval(parseFloat(e.target.value))}
                />
                <div className="flex justify-between mt-1">
                    <span>R${priceInterval}</span>
                    <span>R$20000</span>
                </div>
            </div>

            <div className="flex flex-col">
                <h3 className="mb-1">Subcategories</h3>
                <ul className="flex flex-col">
                    <ListItem to="#" 
                        isSelected={currentSubCategory === 'all' || !currentSubCategory}
                    >
                        <button 
                            onClick={() => setUrlParam('subcategory', 'all')}
                            className="text-left w-full"
                        >
                            All
                        </button>
                    </ListItem>
                    {subcategories?.map((subcategory, index) => (
                        <ListItem
                            key={subcategory.name}
                            to="#"
                            isSelected={currentSubCategory === (subcategory.name).replace(/\s+/g, '')}
                            isLastItem={index === subcategories.length - 1}
                        >
                            <button 
                                onClick={() => setUrlParam('subcategory', (subcategory.name).replace(/\s+/g, ''))}
                                className="text-left w-full"
                            >
                                {subcategory.name.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')}
                            </button>
                        </ListItem>
                    ))}
                </ul>
            </div>
            <div>
                <h3 className="mb-1">Brands</h3>
                <Brands
                    setBrand={setBrand}
                    currentBrand={currentBrand}
                />
            </div>
        </div>
    )
}

export default SmallScreenFilters;