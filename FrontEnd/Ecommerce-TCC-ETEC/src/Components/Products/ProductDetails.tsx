import { TiShoppingCart } from "react-icons/ti";
import Button from "../Layout/Button";

interface productDetailsProps {
  price: number,
  installments: number,
  stock: number,
  productId: number,
  addProduct: (productId: number) => void
}

const ProductDetails = ({ price, installments, stock, productId, addProduct }: productDetailsProps) => {
  return (
    <div className="flex flex-col min-w-[40%]">
      <div className="px-1 mt-4">
        <h2 className="font-medium text-3xl sm:text-4xl">${price.toFixed(2).replace('.', ',')}</h2>
        <p className="font-medium mt-1 mb-3">
          <span>In Util </span>
          <span className="text-mainBlue text-lg sm:text-xl">{installments}x</span>
          <span className="text-mainBlue text-lg sm:text-xl"> ${(price / installments).toFixed(2)}</span>
          <span className="text-mainBlue text-lg sm:text-xl"> interest-free</span>
        </p>
        <p className="text-mainBlue font-medium cursor-pointer hover:underline inline-block">See Payment Methods</p>
        <p className="text-mainBlue font-medium">Free Shipping</p>
        <p className="text-mainBlue font-medium cursor-pointer hover:underline inline-block">See More Delivery Methods</p>
      </div>
      <div className="mt-5">
        <p className="font-medium">Available Stock</p>
        <div className="bg-neutral-300/50 rounded-lg px-5 py-1 mt-2">
            <p className="flex gap-5 font-medium">
              Quantity: 1 
              <span className="text-neutral-400 font-normal">(+{stock}) Available</span>
            </p>
        </div>
      </div>
      <div className="bg-neutral-300/50 rounded-xl px-5 py-1 mt-4">
          <p className="">Color:</p>
          <div className="flex items-center gap-2">
            <div className="bg-black w-4 h-4 rounded-full border border-white cursor-pointer"></div>
            <p className="font-medium">Black</p>
          </div>
      </div>
      <div className="flex mt-5">
            <Button
                onClick={() => addProduct(productId)}
                className="flex flex-1 justify-center gap-3"
            >
                <><TiShoppingCart size={25} /> Add to Cart</>
            </Button>
      </div>
      <div className="flex gap-3 mt-5">
        <input 
          type="text"
          placeholder="Postal Code"
          className="border border-neutral-400 placeholder:text-neutral-400 focus:outline-none rounded-full px-3 py-1"
        />
        <Button
          outline
        >
          OK
        </Button>
      </div>
    </div>
  )
}

export default ProductDetails;