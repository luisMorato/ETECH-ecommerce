import {
    useEffect,
    useMemo,
    useRef,
    useState 
} from "react";

interface sliderDataProps {
    id: number,
    src: string,
    text: {
        title: string,
        subtitle: string,
        paragraph: string
    }
}

const Slider = () => {
    const SliderData: sliderDataProps[] = useMemo(() =>[
        { 
            id: 0,
            src: '/Images/girl-smilling-to -the-phone.jpg',
            text: {
                title: 'The Best SmartPhones',
                subtitle: 'Special Sale',
                paragraph: 'From $550 or $22,91/mo. For 24 mo.'
            }
        },
        { 
            id: 1,
            src: '/Images/indoor-portrait-cheerful-man-good-mood.jpg',
            text: {
                title: 'Latest Models Available',
                subtitle: 'Grab Yours',
                paragraph: 'From $900 or $37,50/mo. For 24 mo.'
            }
        },
        { 
            id: 2,
            src: '/Images/young-brunet-man-wearing-white-t-shirt.jpg',
            text: {
                title: 'Ultimate Smartphone Experience',
                subtitle: 'Exclusive Offers',
                paragraph: 'From $550 or $22,91/mo. For 24 mo.'
            }
        },
    ], []);
    
    const [currentSlide, setCurrentSlide] = useState(0);
    const interval = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    const handleSlideChange = (index: number) => {
        clearInterval(interval.current);
        setCurrentSlide(index);
    }

    useEffect(() => {
        const slideForwards = () => {
            setCurrentSlide((prevValue) => prevValue === SliderData.length - 1 ? 0 : prevValue + 1);
        }

        interval.current = setTimeout(() => {
            slideForwards();
        }, 3000);

        return () => clearInterval(interval.current);
    }, [SliderData, currentSlide]);
  
    return (
        <div 
            className="relative flex rounded-2xl overflow-hidden max-w-[400px] flex-1
            max-md:max-h-[280px]
            md:max-w-full
            md:max-2xl:max-h-[550px]
            xl:h-full
            xl:w-1/2"
        >
            {SliderData.map((data) => (
                <div
                    key={data.id}
                    style={{ transform: `translateX(${(data.id - currentSlide) * 100}%)` }}
                    className={`relative h-full transition duration-300`}
                >
                    <div 
                        className={`absolute top-5 right-0 z-20 translate-x-20 transition duration-150 ${currentSlide === data.id ? "block opacity-100" : "hidden opacity-0"}
                        md:max-lg:right-5
                        md:top-1/4
                        md:mr-4`}
                    >
                        <h3 
                            className="text-sm text-wrap w-4/5 text-[#2295E9] font-bold
                            md:text-2xl"
                        >{data.text.title}</h3>
                        <h2 
                            className="text-xl text-black font-bold mb-3
                            md:text-4xl"
                        >{data.text.subtitle}</h2>
                        <h3 
                            className="text-sm text-black text-wrap font-bold w-4/6
                            md:text-2xl
                            md:w-4/5"
                        >{data.text.paragraph}</h3>
                    </div>
                    <img
                        src={data.src}
                        alt="Slider Image"
                        className={`flex-1 min-h-full brightness-90 ${currentSlide === data.id ? "block" : "hidden"}`}
                    />
                </div>
            ))}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex gap-3">
                {Array.from({ length: SliderData.length }).map((_, index) => (
                    <input
                        key={index}
                        name="currentImage"
                        type="radio"
                        checked={currentSlide === index}
                        onChange={() => handleSlideChange(index)}
                        className="appearance-none w-3 h-3 border border-mainBlue rounded-full cursor-pointer hover:bg-mainBlue checked:bg-mainBlue"
                    />
                ))}
            </div>
        </div>
    )
}

export default Slider;