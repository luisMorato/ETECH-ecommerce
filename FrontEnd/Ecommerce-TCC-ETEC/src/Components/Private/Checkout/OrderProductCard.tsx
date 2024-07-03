import { cartProductsProps } from "../../../interfaces/cartProps";
import { checkTextLength } from "../../../utils/checkTextLength";

interface orderProductCardProps {
    cartProduct: cartProductsProps,
    removeFromCart: (productId: number) => void
}

const OrderProductCard = ({ cartProduct, removeFromCart }: orderProductCardProps) => {
    const productImageUrl = `${import.meta.env.VITE_BACKEND_URL}/public/images/products/${cartProduct?.products.images[0]}`;
  
    return (
        <div className="self-center bg-white w-2/4 rounded-2xl">
            <h2 className="text-lg text-black font-medium px-5 my-3">{cartProduct?.products.name}</h2>
            <div className="flex gap-5 px-5 py-3">
                <div className="max-w-[200px] mr-5">
                    <img src={productImageUrl} alt={`product-${cartProduct?.products.name}`} />
                </div>
                <div className="flex flex-col items-start justify-evenly font-medium w-3/5">
                    <p className="text-black">{checkTextLength(cartProduct?.products.desc[0], 40)}</p>
                    <p className="text-neutral-400">Color: Black</p>
                    <button
                        onClick={() => removeFromCart(cartProduct?.products.id)}
                        className="text-[#2295E9] hover:text-[#1678BE]"
                    >
                        Delete
                    </button>
                    <div className="flex justify-between text-black w-full">
                        <div className="border border-neutral-400 px-3 w-fit">
                            <span>{cartProduct?.quantity} un.</span>
                        </div>
                        <span className="font-bold text-lg">{(cartProduct.products.price).toFixed(2)}</span>
                    </div>
                </div>
            </div>
            <div className="border-t border-t-neutral-300">
                <div className="flex flex-1 justify-between text-black font-medium px-10 py-5">
                    <p>Freight</p>
                    <span>---</span>
                </div>
            </div>
        </div>
    )
}

export default OrderProductCard;