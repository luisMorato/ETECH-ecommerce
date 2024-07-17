import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { cartProductsProps } from "../../interfaces/cartProps";

import CartCard from "./CartCard";
import Button from "./Button";

interface CartProductsProps {
    cartProducts: cartProductsProps[],
    token: string | undefined,
    subtotal: number
}

const Cart = ({ cartProducts, token, subtotal }: CartProductsProps) => {
    const navigate = useNavigate();

    //Removes a CartProduct from database
    const removeProduct = useCallback(async (productId: number) => {
        const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/cart/${productId}`);

        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${token}`
                },
            });

            const resJson = await response.json();

            if(!response.ok){
                toast.error(resJson.message);
                return;
            }

            const { message } = resJson;
            toast.success(message);
            if(window.location.pathname.includes('/checkout')){
                setTimeout(() => {
                    window.location.reload();
                }, 3500);
            }
        } catch (error) {
            console.log('Error: ', error);
        }

    }, [token]);

    //Check if the cart has any product before goes to the checkout page
    const checkOut = async () => {
        if(cartProducts.length === 0){
            toast.error('Cart is Empty');
            return;
        }

        navigate(`/checkout/${token}`);
    }

    return (
        <div className="absolute top-full right-0 z-30 translate-y-1 bg-white w-[336px] text-black h-fit p-3 rounded-2xl border border-neutral-300
        min-[370px]:w-[350px]
        min-[400px]:w-[380px]
        sm:w-[400px]">
            <h2 className="text-black font-medium text-2xl border-b pb-2 mb-2">CART</h2>
            <div className={`flex flex-col ${cartProducts.length > 4 ? "overflow-y-scroll max-h-[400px] pr-1.5" : "h-fit"}`}>
                {cartProducts.length > 0 ?
                    cartProducts?.map((cartProduct) => (
                        <CartCard
                            key={cartProduct.products.id}
                            cartProduct={cartProduct}
                            removeProduct={removeProduct}
                        />
                    ))
                    :
                    (
                        <div className="flex flex-col gap-1 py-3">
                            <span className="font-medium text-lg">No Products</span>
                            <a href="/products?category=hardware" className="font-medium cursor-pointer hover:underline"
                            >Start Adding Now</a>
                        </div>
                    )
                }
            </div>
            <div className="flex justify-between w-full mt-4">
                <span className="text-lg font-medium">Subtotal</span>
                <span className="text-lg font-medium">${(subtotal).toFixed(2)}</span>
            </div>
            <div className="flex mt-5">
                <Button
                    className="flex-1"
                    onClick={checkOut}
                >CheckOut</Button>
            </div>
        </div>
    )
}

export default Cart;