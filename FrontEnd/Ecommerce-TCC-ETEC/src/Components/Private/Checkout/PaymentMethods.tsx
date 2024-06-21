import { useState } from "react";
import { FaPix } from "react-icons/fa6";
import { FaBarcode } from "react-icons/fa6";

import CreditCard from "./CreditCard";
import Button from "../../Layout/Button";

interface paymentMethodProps {
    setNextStep: (step: string) => void
}

const PaymentMethods = ({ setNextStep }: paymentMethodProps) => {
    const [option, setOption] = useState('creditcard');
    
    return (
        <div className="flex flex-col gap-5 text-black mx-auto w-2/4 py-5">
            <div className="bg-white py-4 mb-3 rounded-lg">
                <h1 className="text-xl text-black text-center font-medium">Choose the Payment Method</h1>
            </div>
            <div className="flex flex-col gap-5">
                <CreditCard 
                    setOption={setOption}
                    option={option}
                />
                <div
                    onClick={() => setOption('pix')}
                    className={`relative flex items-center justify-between bg-white px-2 py-3 rounded-lg cursor-pointer
                        ${option === 'pix' ? "border border-[#2295E9]" : ""}`
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
                        onClick={() => setOption('ticket')}
                        className={`relative flex items-center justify-between bg-white px-2 py-3 rounded-lg cursor-pointer
                            ${option === 'ticket' ? "border border-[#2295E9]" : ""}`
                        }
                    >
                        <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center border border-neutral-400 rounded-full p-1.5 h-9 w-9">
                            <FaBarcode size={25}/>
                        </span>
                        <div>
                            <h2 className="text-xl font-medium">Ticket</h2>
                            <span className="text-neutral-400 text-sm font-medium">Approval in 1 to 2 business days</span>
                        </div>
                    </div>
                    </div>
                <div className="flex mt-5">
                    <Button
                        className="flex-1"
                        onClick={() => setNextStep('completeOrder')}
                    >
                        Place Order
                    </Button>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default PaymentMethods;