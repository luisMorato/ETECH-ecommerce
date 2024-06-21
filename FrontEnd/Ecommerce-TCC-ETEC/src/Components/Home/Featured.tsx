import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MdArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";

import { productProps } from "../../interfaces/productsProps";

import ProductCard from "../Layout/ProductCard";

const Featured = () => {
    const url = useMemo(() =>new URL(`${import.meta.env.VITE_BACKEND_URL}/products`), []);

    const [featuredProducts, setFeaturedProducts] = useState<productProps[]>([]);

    const [start, setStart] = useState(true);
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const interval = useRef<number | undefined>(undefined);
    const slideBackInterval = useRef<number | undefined>(undefined);

    const slideForward = useCallback(() => {
        if(sliderRef.current){
            const sliderWidth = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;

            sliderRef.current.scroll({
                behavior: "smooth"
            });

            if(sliderRef.current.scrollLeft >= sliderWidth){
                slideBackInterval.current = setInterval(() => {slideBack()}, 10);
            }else{ 
                sliderRef.current.scrollLeft += 1;
            }
        }
    }, []);

    const slideBack = () => {
        if(sliderRef.current){
            if(sliderRef.current.scrollLeft === 0){
                clearInterval(slideBackInterval.current);
            }
            else{
                sliderRef.current.scrollLeft -= 10;
            }
        }
    }

    const clickForwards = () => {
        if(sliderRef.current){
            sliderRef.current.scrollLeft += 50;
        }
    }

    const clickBackwards = () => {
        if(sliderRef.current){
            sliderRef.current.scrollLeft -= 50;
        }
    }

    const handleMouseOver = () => {
        setStart(false);
        clearInterval(interval.current);
    }

    const handleMouseLeave = () => {
        setStart(true);
    }

    useEffect(() => {
        interval.current = setInterval(() => {
            slideForward();
        }, 50);

        return () => clearInterval(interval.current);
    }, [start, slideForward]);
    
    useEffect(() => {
        const fetchProducts = async () => {
            url.searchParams.set('perPage', String(10));
        
            const response = await fetch(url, {
                method: "GET",
                headers: {
                "content-type": "application/json",
                }
            });
    
            if(response.ok){
                const resJson = await response.json();
                const { products: apiProducts } = resJson;

                setFeaturedProducts(apiProducts);
            }
        }
    
        fetchProducts();
    }, [url]);
  
    return (
        <div id="featured" className="py-8 mt-5 w-4/5 mx-auto">
            <h2 className="text-3xl text-black font-medium mb-8">Featured Collection</h2>
            <div className="flex items-center justify-around">
                <div>
                    <button
                        onClick={clickBackwards}
                    >
                        <MdArrowBackIosNew
                            size={40} 
                            className="text-black hover:scale-125 transition duration-200 mr-2"
                        />
                    </button>
                </div>
                <div 
                    ref={sliderRef}
                    onMouseOver={handleMouseOver}
                    onMouseLeave={handleMouseLeave}
                    className={`flex gap-5 pb-3 overflow-x-scroll`}
                >
                    {featuredProducts?.map((featuredProduct) => (
                        <ProductCard
                            key={featuredProduct.id}
                            product={featuredProduct}
                            addProduct={() => {}}
                            subtractProduct={() => {}}
                        />
                    ))}
                </div>
                <div>
                    <button
                        onClick={clickForwards}>
                        <MdOutlineArrowForwardIos 
                            size={40} 
                            className="text-black hover:scale-125 transition duration-200 ml-2"
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Featured;