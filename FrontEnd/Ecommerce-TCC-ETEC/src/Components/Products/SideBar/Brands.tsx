import { ChangeEvent, useMemo, useState } from "react";
import { IoIosSearch } from "react-icons/io";

import { MdOutlineKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

interface brandsProps {
    setBrand: (brand: string) => void,
    currentBrand: string
}

const Brands = ({ setBrand, currentBrand }: brandsProps) => {
    const [showMore, setShowMore] = useState(false);
    const [brandSearch, setBrandSearch] = useState('');

    const  brands: { name: string }[] = useMemo(() => [
        { name: "Acer" },
        { name: "AMD" },
        { name: "Adata" },
        { name: "Aorus" },
        { name: "Apple" },
        { name: "ASUS" },
        { name: "ASRock" },
        { name: "Corsair" },
        { name: "Crucial" },
        { name: "Dell" },
        { name: "Epson" },
        { name: "Husky Gaming" },
        { name: "Intel" },
        { name: "Kingston" },
        { name: "Logitech" },
        { name: "Nvidia" },
        { name: "NZXT" },
        { name: "MultiLaser" },
        { name: "MSI" },
        { name: "Razer" },
        { name: "Redragon" },
        { name: "Radeon" },
        { name: "Rise Mode" },
        { name: "Samsung" },
        { name: "Seagate" },
        { name: "Sony" },
        { name: "Xiaomi" },
        { name: "XPG" },
    ], []);

    //Handle the Brand Search Input Change
    const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBrandSearch(e.target.value);
    }

    return (
        <div className="relative mb-5">
            <div className="flex items-center gap-2 text-neutral-400 border border-neutral-400 py-1 px-1 mb-3 rounded-xl overflow-hidden">
                <div>
                    <IoIosSearch size={25} />
                </div>
                <input 
                    type="text"
                    placeholder="Search Brand"
                    value={brandSearch}
                    className=" placeholder:text-neutral-400 focus:outline-none"
                    onChange={(e) => handleSearchInputChange(e)}
                />
            </div>
            <div className={`flex flex-col gap-2 pl-3 ${showMore ? "h-fit" : "h-56 overflow-y-hidden"}`}>
                {!window.location.pathname.includes('/profile') &&
                    <div className="flex gap-1.5">
                        <input
                            id={("All").toLowerCase()}
                            name="brand"
                            type="radio"
                            className="cursor-pointer"
                            checked={!currentBrand || currentBrand === "all" ? true : false}
                            onChange={(e) => setBrand(e.currentTarget.id)}
                        />
                        <label htmlFor="subcategory">All</label>
                    </div>
                }
                {brands
                .filter((brand) => brand.name.toLowerCase().includes(brandSearch.toLowerCase()))
                .map((brand) => (
                    <div key={brand.name} className="flex gap-1.5">
                        <input
                            id={(brand.name).replace(/\s+/g, '').toLowerCase()}
                            name="brand"
                            type="radio"
                            className="cursor-pointer"
                            checked={(brand.name).replace(/\s+/g, '').toLowerCase() === currentBrand}
                            onChange={(e) => setBrand(e.currentTarget.id)}
                        />
                        <label htmlFor="subcategory">{brand.name}</label>
                    </div>
                ))}
            </div>
            <button
                type="button"
                onClick={() => setShowMore((prevValue) => !prevValue)}
                className="absolute top-full -translate-y-2 left-1/2 -translate-x-1/2 z-30"
            >
                {showMore ?
                    <MdKeyboardArrowUp size={25}/>
                    :
                    <MdOutlineKeyboardArrowDown size={25}/>
                }
            </button>
        </div>
    )
}

export default Brands;