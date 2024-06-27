import { Dispatch, SetStateAction } from "react";
import { CiShare2 } from "react-icons/ci";

import { productProps } from "../../interfaces/productsProps";

interface productImagesProps {
    images: string[] | undefined,
    product: productProps,
    setCurrentImage: Dispatch<SetStateAction<number>>,
    currentImage: number
}

const ProductImages = ({ images, product, setCurrentImage, currentImage }: productImagesProps) => {
    const zoomImage = () => {
        
    }
    
    return (
        <>
            <div className="flex flex-col self-center max-w-[350px]">
                <div className="flex self-center max-w-[350px] overflow-hidden">
                    {images?.map((image) => (
                        <img
                            key={image}
                            src={image}
                            //Another way to do it:
                            //src={`${import.meta.env.VITE_BACKEND_URL}/public/images/products/${image}`}
                            alt={`Product-${product.name}`}
                            onMouseOver={zoomImage}
                            className={`transition duration-100`}
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}
                        />
                    ))}
                </div>
            </div>
            <div className="relative flex-1 mb-2">
                <div className="flex justify-center gap-3 flex-1 mt-4">
                    {Array.from({ length: product.image.length }).map((_, index) => (
                        <button
                        onClick={() => setCurrentImage(index)}
                        key={index}
                        className={`${index === currentImage ? "bg-mainBlue" : "bg-transparent border border-mainBlue"} h-4 w-4 rounded-full cursor-pointer hover:bg-mainBlue`}
                        ></button>
                    ))}
                </div>
                <span className="absolute top-1/2 -translate-y-1/2 right-5 flex items-center justify-center bg-neutral-300 rounded-full p-1 cursor-pointer hover:bg-neutral-400"><CiShare2 size={25} /></span>
            </div>
        </>
    )
}

export default ProductImages;