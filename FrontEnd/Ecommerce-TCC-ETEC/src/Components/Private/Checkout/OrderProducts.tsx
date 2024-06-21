import { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "../../Layout/Button";
import OrderProductCard from "./OrderProductCard";

interface orderProductsProps {
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
    setNextStep: (step: string) => void
}

const OrderProducts = ({ cartProducts, setNextStep }: orderProductsProps) => {
    const total = useMemo(() => cartProducts.map((product) => product.quantity * product.products.price).reduce((prev, current) => prev + current, 0), [cartProducts]);

    const { userToken: token } = useParams();

    const removeFromCart = useCallback(async (productId: number) => {
        const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/cart`);

        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({productId})
            });
    
            const resJson = await response.json();
            const { message } = resJson;

            if(!response.ok){
                toast.error(message);
            }

            toast.success(message);
            setTimeout(() => {
                window.location.reload();
            }, 3500);
        } catch (error) {
            console.log('Error: ', error);
        }
    }, [token]);
    
    return (
        <div className="flex flex-col gap-5 px-3 w-full">
            {cartProducts.map((cartProduct) => (
                <OrderProductCard
                    key={cartProduct.products.id}
                    cartProduct={cartProduct}
                    removeFromCart={removeFromCart}
                />
            ))}
            <div className="self-center bg-white w-2/4 px-8 py-5 rounded-2xl">
                {cartProducts.map((cartProduct) => (
                    <div key={cartProduct.products.id} className="flex justify-between flex-1 mb-3 text-black">
                        <p className="font-medium">{cartProduct.products.name}</p>
                        <span className="font-bold">$ {(cartProduct.products.price).toFixed(2)}</span>
                    </div>
                ))}
                <div className="flex justify-between flex-1 mb-3 mt-6 font-medium text-[#2295E9]">
                    <p>What is the shipping cost?</p>
                    <span className="text-lg font-bold">---</span>
                </div>
                <div className="flex justify-between flex-1 mb-12 font-medium text-black">
                    <p>Total</p>
                    <span className="font-bold">$ {total.toFixed(2)}</span>
                </div>
                <div className="flex">
                    <Button
                        onClick={() => setNextStep('deliverymethod')}
                        className="flex-1"
                    >
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default OrderProducts;