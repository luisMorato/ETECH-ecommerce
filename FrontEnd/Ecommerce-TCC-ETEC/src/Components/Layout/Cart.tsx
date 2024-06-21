import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import CartCard from "./CartCard";
import Button from "./Button";

interface CartProductsProps {
    cartProducts: {
        quantity: number,
        products: {
            id: number,
            name: string,
            image: string[],
            price: number,
            desc: string[],
            stock: number,
        }
    }[],
    token: string | undefined,
    subtotal: number
}

const Cart = ({ cartProducts, token, subtotal }: CartProductsProps) => {
    const navigate = useNavigate();

    const removeProduct = useCallback(async (productId: number) => {
        const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/cart`);

        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ productId })
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

    const buildOrder = async () => {
        if(cartProducts.length === 0){
            toast.error('Cart is Empty');
            return;
        }

        const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/checkout`);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "authorization": `Bearer ${token}`
            }
        });

        const resJson = await response.json();
        const { message } = resJson;

        if(!response.ok){
            toast.error(message);
            return;
        }

        navigate(`/checkout/${token}`);
    }

    return (
        <div className="absolute top-full right-0 z-30 translate-y-1 bg-white text-black w-[400px] h-fit p-3 rounded-2xl border border-neutral-300">
            <h2 className="text-black font-medium text-2xl border-b pb-2 mb-2">CART</h2>
            <div className={`flex flex-col pr-1 ${cartProducts.length > 4 ? "overflow-y-scroll max-h-[400px]" : "h-fit"}`}>
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
                            <span className="font-medium">Start Adding Now</span>
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
                    onClick={buildOrder}
                >CheckOut</Button>
            </div>
        </div>
    )
}

export default Cart;