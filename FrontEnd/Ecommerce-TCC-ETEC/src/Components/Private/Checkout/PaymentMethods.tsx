import { 
    ChangeEvent,
    useEffect, 
    useState
} from "react";
import { useParams } from "react-router-dom";
import { FaPix } from "react-icons/fa6";
import { FaBarcode } from "react-icons/fa6";
import { toast } from "react-toastify";

import { completeOrderProps } from "../../../interfaces/OrderProps";

import CreditCard from "./CreditCard";
import Button from "../../Layout/Button";

interface paymentMethodProps {
    setNextStep: (step: string) => void
}

const PaymentMethods = ({ setNextStep }: paymentMethodProps) => {
    const { userToken: token } = useParams();

    const [paymentMethod, setPaymentMethod] = useState('Credit Card');
    const [creditCardData, setCreditCardData] = useState({
        number: '',
        expiration: '',
        cardCode: ''
    });
    const [order, setOrder] = useState<completeOrderProps[]>();

    //Handle the CreditCard Input Change
    const handleCreditCardDataChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
        setCreditCardData({
            ...creditCardData,
            [name]: e.target.value
        });
    }

    //Build the Order Without the payment method and the status of "processing Order"
    useEffect(() => {
        const getOrder = async () => {
            const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/checkout`);

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            });

            const resJson = await response.json();
            const { completeOrders: apiOrders, message } = resJson;

            if(!response.ok){
                toast.error(message);
                return;
            }

            setOrder(apiOrders);
        }

        getOrder()
    }, [token]);
    

    //Place the order, replacing the payment method to the one chosen and changing the status to be "Payment Made"
    const placeOrder = async (orderId: number) => {
        const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/checkout/${orderId}`);
        let data;
        
        data = { 
            paymentMethod
        }

        if(paymentMethod){
            data = {
                paymentMethod,
                ...creditCardData
            }
        }

        try {
          const response = await fetch(url, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
              "authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
          });

          console.log(response);
    
          const resJson = await response.json();
          const { message } = resJson;
    
          if(!response.ok){
            toast.error(message);
            return;
          }
    
          setNextStep('completeOrder');
        } catch (error) {
          console.error('Error: ', error);
        }
    }
    
    return order && (
        <div className="flex flex-col gap-5 text-black mx-auto w-2/4 py-5">
            <div className="bg-white py-4 mb-3 rounded-lg">
                <h1 className="text-xl text-black text-center font-medium">Choose the Payment Method</h1>
            </div>
            <div className="flex flex-col gap-5">
                <CreditCard 
                    setPaymentMethod={setPaymentMethod}
                    paymentMethod={paymentMethod}
                    handleCreditCardDataChange={handleCreditCardDataChange}
                />
                <div
                    onClick={() => setPaymentMethod('pix')}
                    className={`relative flex items-center justify-between bg-white px-2 py-3 rounded-lg cursor-pointer
                        ${paymentMethod === 'pix' ? "border border-[#2295E9]" : ""}`
                    }
                >
                    <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center border border-neutral-400 rounded-full h-9 w-9">
                            <FaPix size={25}/>
                        </span>
                        <div>
                            <h2 className="text-xl font-medium">Pix</h2>
                            <span className="text-neutral-400 text-sm font-medium">immediate approval</span>
                        </div>
                    </div>
                </div>
                <div
                        onClick={() => setPaymentMethod("ticket")}
                        className={`relative flex items-center justify-between bg-white px-2 py-3 rounded-lg cursor-pointer
                            ${paymentMethod === "ticket" ? "border border-[#2295E9]" : ""}`
                        }
                    >
                        <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center border border-neutral-400 rounded-full p-1.5 h-9 w-9">
                            <FaBarcode size={25}/>
                        </span>
                        <div>
                            <h2 className="text-xl font-medium">Payment Slip</h2>
                            <span className="text-neutral-400 text-sm font-medium">Approval in 1 to 2 business days</span>
                        </div>
                    </div>
                    </div>
                <div className="flex mt-5">
                    <Button
                        type="button"
                        className="flex-1"
                        onClick={() => placeOrder(order[order.length - 1].id)}
                    >
                        Place Order
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default PaymentMethods;