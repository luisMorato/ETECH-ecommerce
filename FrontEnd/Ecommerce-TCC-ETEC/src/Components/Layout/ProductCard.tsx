import { useEffect, useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { IoStar } from "react-icons/io5";

import { checkTextLength } from "../../utils/checkTextLength";

import { productProps } from "../../interfaces/productsProps";

import Button from "./Button";
import { Link } from "react-router-dom";

interface productCardProps {
    product: productProps,
    addProduct: (productId: number) => void
    subtractProduct?: (productId: number) => void
}

const ProductCard = ({ product, addProduct }: productCardProps) => {
    const [images, setImages] = useState<string>();

    useEffect(() => {
        const getImages = async () => {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/products/image/${product?.image[0]}`
                const response = await fetch(url, {
                    method: "GET",
                });

                const res = await response.blob(); 
                const imageURL = URL.createObjectURL(res);
                setImages(imageURL);
            } catch (error) {
                console.log('Error: ', error);
            }
        }

        getImages();
    }, [product?.image]);
    
    return (
        <div className="relative flex flex-col bg-white rounded-2xl h-[480px] min-w-[320px] max-w-[320px] py-3">
            <div className="absolute z-20 left-5 top-3 flex items-center justify-center text-white text-xs text-center text-wrap font-medium h-10 w-10 rounded-md bg-[#2295E9]">
                <span>{product?.stock > 0 ? "In Stock" : "Out Of Stock"}</span>
            </div>
            <Link to={`/products/${product?.id}`}>
                <div className="flex justify-center w-3/4 max-h-[250px] mx-auto cursor-pointer py-3">
                    {<img
                        src={images}
                        alt={`product-${product?.name}`}
                        className="hover:scale-105 transition duration-150"
                    />}
                </div>
            </Link>
            <div className="text-black">
                <div className="flex flex-col w-4/5 mx-auto">
                    <div className="flex gap-2 mb-4">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <IoStar key={index} size={16} className="text-[#F4B921]" />
                        ))}
                    </div>
                    <p className={`text-lg text-center font-medium`}>{checkTextLength(product?.name, 40)}</p>
                    <span className="flex-1 text-2xl text-center font-bold tracking-wider mt-5">${(product.price).toFixed(2)}</span>
                </div>
                <Button
                    onClick={() => addProduct(product?.id)}
                    className="absolute flex gap-3 bottom-5 -translate-x-1/2 left-1/2 w-3/6"
                >
                    <><TiShoppingCart size={25} /> Add to Cart</>
                </Button>
            </div>
        </div>
    )
}

export default ProductCard