import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

import { cartProductsProps } from "../../interfaces/cartProps";

import { checkTextLength } from "../../utils/checkTextLength";

interface CartProductProps {
  cartProduct: cartProductsProps,
  removeProduct: (productId: number) => void
}

const CartCard = ({ cartProduct, removeProduct }: CartProductProps) => {
  const imageUrl = `${import.meta.env.VITE_BACKEND_URL}/public/images/products/${cartProduct.products.images[0]}`;
  
  return (
    <section className="flex items-center gap-5 border-b border-b-neutral-400 py-2 w-full">
        <div className="max-w-24 mr-4">
          <Link to={`/products/${cartProduct.products.id}`}>
            <img
              src={imageUrl}
              alt={`product-${cartProduct.products.name}`}
              className="w-full"
            />
          </Link>
        </div>
       <div className="flex flex-col gap-3">
        <div className="flex items-center gap-5 w-full">
          <h2 className="text-sm font-medium md:text-base">{checkTextLength(cartProduct.products.name, 30)}</h2>
          <button
            onClick={() => removeProduct(cartProduct.products.id)}
            className="hover:rotate-12"
          >
            <FaTrashAlt size={20}/>
          </button>
        </div>
        <div className="flex items-end justify-between pr-3 md:items-start">
          <span className="font-medium border border-neutral-300 px-1 py-0.5 w-fit">
              {cartProduct.quantity} un.
          </span>
          <span className="font-medium">{(cartProduct.products.price).toFixed(2)}</span>
        </div>
       </div>
    </section>
  )
}

export default CartCard;