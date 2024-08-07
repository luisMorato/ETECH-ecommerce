import { 
    ChangeEvent,
    Dispatch, 
    SetStateAction, 
    useState
} from "react";

import { 
    FaCcVisa, 
    FaCcMastercard 
} from "react-icons/fa";
import { MdKeyboardArrowUp } from "react-icons/md";
import { BsCreditCard } from "react-icons/bs";

interface creaditCardProps {
    setPaymentMethod: Dispatch<SetStateAction<string>>
    paymentMethod: string,
    handleCreditCardDataChange: (e: ChangeEvent<HTMLInputElement>, name: string) => void
}

const CreditCard = ({ setPaymentMethod, paymentMethod, handleCreditCardDataChange }: creaditCardProps) => {
    const [openCredit, setOpenCredit] = useState(false);
  
    return (
        <div
            onClick={() => setPaymentMethod('Credit Card')}
            className={`relative flex justify-between bg-white px-2 py-5 rounded-lg cursor-pointer
            ${paymentMethod === 'Credit Card' ? "border border-[#2295E9]" : ""}
            ${openCredit ? "rounded-b-none rounded-bl-none border-b-transparent" : ""}`
            }
        >
            <h2 className="flex items-center gap-2">
                <span className="border border-neutral-400 rounded-full p-1"><BsCreditCard size={25}/></span>
                <span className="text-xl font-medium">Credit Card</span>
            </h2>
            <div
                className="flex items-center gap-3"
            >
                <div className="flex items-center gap-3">
                    <FaCcVisa size={25}/>
                    <FaCcMastercard size={25}/>
                </div>
                <button
                    onClick={() => setOpenCredit((prevValue) => !prevValue)}
                >
                    {<MdKeyboardArrowUp size={25} className={`transition duration-100 ${openCredit ? "rotate-180" : "rotate-90"}`}/>}
                </button>
            </div>
            {openCredit && 
                <div 
                className={`absolute top-full left-0 -translate-x-[1px] z-30 flex flex-col gap-8 py-4 px-5 w-full bg-white rounded-b-xl rounded-bl-2xl overflow-hidden
                ${paymentMethod === "Credit Card" ? "border border-[#2295E9] border-t-transparent" : ""}`}>
                    <div className={`relative border border-neutral-400 rounded-xl max-w-[500px]`}>
                        <label htmlFor="number" className="absolute top-0 -translate-y-3 left-3 px-1 text-sm text-black font-medium bg-white">Card Number *:</label>
                        <input
                            name="number"
                            type="text"
                            placeholder="0000 0000 0000 0000"
                            onChange={(e) => handleCreditCardDataChange(e, e.target.name)}
                            className="text-neutral-400 px-3 py-2 w-full rounded-xl focus:outline-none"
                        />
                    </div>
                    <div className="flex items-center gap-5">
                        <div className={`relative border border-neutral-400 rounded-xl w-[240px]`}>
                            <label htmlFor="expiration" className="absolute top-0 -translate-y-3 left-3 px-1 text-sm text-black font-medium bg-white">Expiration (MM/YY) *:</label>
                            <input
                                name="expiration"
                                type="text"
                                placeholder="MM/YY"
                                onChange={(e) => handleCreditCardDataChange(e, e.target.name)}
                                className="text-neutral-400 px-3 py-2 w-full rounded-xl focus:outline-none"
                            />
                        </div>
                        <div className={`relative border border-neutral-400 rounded-xl w-[240px]`}>
                            <label htmlFor="cardCode" className="absolute top-0 -translate-y-3 left-3 px-1 text-sm text-black font-medium bg-white">Card Security Code *:</label>
                            <input
                                name="cardCode"
                                type="text"
                                placeholder="Ex: 355"
                                onChange={(e) => handleCreditCardDataChange(e, e.target.name)}
                                className="text-neutral-400 px-3 py-2 w-full rounded-xl focus:outline-none"
                            />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default CreditCard;