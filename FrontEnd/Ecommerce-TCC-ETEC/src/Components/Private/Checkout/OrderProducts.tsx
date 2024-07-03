import { useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { cartProductsProps } from "../../../interfaces/cartProps";

import Button from "../../Layout/Button";
import OrderProductCard from "./OrderProductCard";

import { checkTextLength } from "../../../utils/checkTextLength";

interface orderProductsProps {
    cartProducts: cartProductsProps[],
    setNextStep: (step: string) => void
}

const OrderProducts = ({ cartProducts, setNextStep }: orderProductsProps) => {
    const { userToken: token } = useParams();
    const navigate = useNavigate();

    //Calculate the total price from the products in the cart
    const total = useMemo(() => cartProducts.map((product) => product.quantity * product.products.price).reduce((prev, current) => prev + current, 0), [cartProducts]);

    //Remove a cart product before build the order
    const removeFromCart = useCallback(async (productId: number) => {
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


    //Build the Order Without the payment method and the status of "processing Order"
    const buildOrder = async () => {
        const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/checkout`);

        if(cartProducts.length === 0){
            toast.error('cart Is Empty');
            navigate('/');
            return;
        }

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

        setNextStep('deliverymethod');
    }
    
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
                    <div key={cartProduct.products.id} className="flex justify-between gap-2 flex-1 mb-3 text-black">
                        {/*ToDo: Check Window Witdh To hide part of the Product Name*/}
                        <p className="font-medium">{window.innerWidth <= 1600 ? checkTextLength(cartProduct.products.name, 55) : cartProduct.products.name}</p>
                        <span className="text-nowrap font-bold">$ {(cartProduct.products.price).toFixed(2)}</span>
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
                        type="button"
                        onClick={buildOrder}
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