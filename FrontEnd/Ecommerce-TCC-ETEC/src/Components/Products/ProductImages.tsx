import {
    Dispatch,
    MouseEvent,
    SetStateAction,
    useState
} from "react";
import { CiShare2 } from "react-icons/ci";

import { productProps } from "../../interfaces/productsProps";

interface productImagesProps {
    images: string[] | undefined,
    product: productProps,
    setCurrentImage: Dispatch<SetStateAction<number>>,
    currentImage: number
}

interface postionProps {
    x: number,
    y: number,
    top: number,
    left: number,
    //display: string
}

const ProductImages = ({ images, product, setCurrentImage, currentImage }: productImagesProps) => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState<postionProps>({
        x: 0,
        y: 0,
        top: 0,
        left: 0,
        //display: 'hidden'
    });
    
    const zoomImage = (e: MouseEvent<HTMLImageElement>) => {
        setVisible(true);
        const { offsetX, offsetY, target } = e.nativeEvent;

        const width = (target as HTMLImageElement).offsetWidth;
        const height = (target as HTMLImageElement).offsetHeight;

        const zoomX = (offsetX / width) * 100;
        const zoomY = (offsetY / height) * 100;
        
        setPosition({
            ...position,
            x: zoomX,
            y: zoomY,
            top: offsetY - 100,
            left: offsetX - 100,
        })
    }
    
    return images && (
        <>
            <div className="flex flex-col self-center max-w-[350px]">
                <div className="relative flex self-center max-w-[350px] overflow-hidden">
                    {images.map((image) => (
                        <img
                            key={image}
                            src={image}
                            //Another way to do it:
                            //src={`${import.meta.env.VITE_BACKEND_URL}/public/images/products/${image}`}
                            alt={`Product-${product.name}`}
                            onMouseMove={zoomImage}
                            onMouseOut={() => setVisible(false)}
                            // onTouchMove={() => zoomImage}
                            // onTouchEnd={() => setVisible(false)}
                            className={`transition duration-100`}
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}
                        />
                    ))}
                    <div
                        style={{
                            backgroundSize: "600%", 
                            backgroundImage: `url(${images[currentImage]})`,
                            backgroundPosition: `${position.x}% ${position.y}%`,
                            top: `${position.top}px`,
                            left: `${position.left}px`,
                        }}
                        className={visible ? "absolute z-50 size-64 bg-no-repeat" : "hidden"}
                    ></div>
                </div>
            </div>
            <div className="relative flex items-center justify-between flex-1 mb-2">
                <div className="flex justify-center gap-3 flex-1 mt-4">
                    {Array.from({ length: product.images.length }).map((_, index) => (
                        <button
                        onClick={() => setCurrentImage(index)}
                        key={index}
                        className={`${index === currentImage ? "bg-mainBlue" : "bg-transparent border border-mainBlue"} h-4 w-4 rounded-full cursor-pointer hover:bg-mainBlue`}
                        ></button>
                    ))}
                </div>
                {/* <span className="absolute top-full -translate-y-1/2 -right-8 flex items-center justify-center bg-neutral-300 rounded-full p-1 cursor-pointer hover:bg-neutral-400 sm:right-0 md:top-1/2"><CiShare2 size={25} /></span> */}
                <span className="flex items-center justify-center translate-y-2 bg-neutral-300 rounded-full p-1 cursor-pointer hover:bg-neutral-400"><CiShare2 size={25} /></span>
            </div>
        </>
    )
}

export default ProductImages;