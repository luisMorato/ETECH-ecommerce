import { useEffect, useState } from "react"
import { FaTrashAlt } from "react-icons/fa";

import { checkTextLength } from "../../utils/checkTextLength";

import { Link } from "react-router-dom";

interface CartProductProps {
  cartProduct: {
      quantity: number,
      products: {
          id: number,
          name: string,
          image: string[],
          price: number,
          desc: string[],
          stock: number,
      }
  },
  removeProduct: (productId: number) => void
}

const CartCard = ({ cartProduct, removeProduct }: CartProductProps) => {
  const [image, setImage] = useState<string>();

  useEffect(() => {
    const fetchImage = async () => {
      const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/products/image/${cartProduct.products.image[0]}`);

      const response = await fetch(url, {
          method: "GET",
      });

      const res = await response.blob();
      const imageUrl = URL.createObjectURL(res);
      setImage(imageUrl);
    }

    fetchImage();
  }, [cartProduct.products.image]);
  
  return (
    <section className="flex items-center gap-5 border-b border-b-neutral-400 py-2 w-full">
        <div className="max-w-24 mr-4">
        <Link to={`/products/${cartProduct.products.id}`}>
          <img
            src={image}
            alt={`product-${cartProduct.products.name}`}
            className="w-full"
          />
        </Link>
        </div>
       <div className="flex flex-col gap-3">
        <div className="flex items-center gap-5 w-full">
          <h2 className="font-medium">{checkTextLength(cartProduct.products.name, 30)}</h2>
          <button
            onClick={() => removeProduct(cartProduct.products.id)}
            className="hover:rotate-12"
          >
            <FaTrashAlt size={20}/>
          </button>
        </div>
        <div className="flex justify-between pr-3">
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