import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MdArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";

import { productProps } from "../../interfaces/productsProps";

import ProductCard from "../Layout/ProductCard";

const Featured = () => {
    const url = useMemo(() =>new URL(`${import.meta.env.VITE_BACKEND_URL}/products`), []);

    const [featuredProducts, setFeaturedProducts] = useState<productProps[]>([]);
    const [currentWidth, setCurrentWidth] = useState(window.innerWidth);

    const [start, setStart] = useState(true);
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const interval = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const slideBackInterval = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    //Slide forward until it reaches the max width, then it scroll back to the beginning
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

    //Handle the slide Back to beginning
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

    //Slide Forward a Little When the button is Clicked
    const clickForwards = () => {
        if(sliderRef.current){
            sliderRef.current.scrollLeft += 50;
        }
    }

    //Slide Back a Little When the button is Clicked
    const clickBackwards = () => {
        if(sliderRef.current){
            sliderRef.current.scrollLeft -= 50;
        }
    }

    //Stops the Sliding when the mouse is over the component
    const handleMouseOver = () => {
        setStart(false);
        clearInterval(interval.current);
    }

    //Start Sliding when the mouse leaves the component
    const handleMouseLeave = () => {
        setStart(true);
    }

    //Call the function to slide Forwards every 50 milliseconds
    useEffect(() => {
        interval.current = setInterval(() => {
            slideForward();
        }, 50);

        return () => clearInterval(interval.current);
    }, [start, slideForward]);
    
    //Fetch products from database to redender in the component
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

    window.addEventListener('resize', () => {
        setCurrentWidth(window.innerWidth);
    })
  
    return (
        <div 
            id="featured" 
            className="flex flex-col py-8 mt-5 mx-auto
            md:max-lg:px-5
            xl:w-4/5"
        >
            <h2 
                className="text-3xl text-black font-medium mb-5 ml-8 
                md:ml-0 
                lg:max-xl:ml-5"
            >
                Featured Collection
            </h2>
            <div className="flex items-center justify-around">
                <div>
                    <button
                        onClick={clickBackwards}
                    >
                        <MdArrowBackIosNew
                            size={currentWidth <= 360 || currentWidth <= 400 ? 30 : 40} 
                            className="text-black hover:scale-125 transition duration-200 mr-2"
                        />
                    </button>
                </div>
                <div 
                    ref={sliderRef}
                    onMouseOver={handleMouseOver}
                    onTouchStart={handleMouseOver}
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
                            size={currentWidth <= 360 || currentWidth <= 400 ? 30 : 40} 
                            className="text-black hover:scale-125 transition duration-200 ml-2"
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Featured;