import { 
    ChangeEvent,
    Dispatch,
    FormEvent,
    SetStateAction,
    useEffect,
    useState
} from "react";
import { FaCamera, FaEye, FaEyeSlash } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { FaX } from "react-icons/fa6";

import Button from "../../Layout/Button";

interface getPasswordProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    isOpen: boolean,
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void,
    choice: string,
    handleGetPassword: (e: ChangeEvent<HTMLInputElement>) => void
}

const GetPassword = ({ setIsOpen, isOpen, handleSubmit, choice, handleGetPassword }: getPasswordProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const [showModal, setShowModal] = useState<boolean>(isOpen);
    
    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = () => {
        setShowModal(false);

        setTimeout(() => {
            setIsOpen(false);
        }, 300);
    }

    return (
        <div className={`${isOpen ? "fixed z-50 flex items-center justify-center w-full h-full" : "hidden"}`}>
            <div 
                className={`transition duration-300 bg-white border border-neutral-400 w-80 rounded-2xl p-3 
                ${showModal ? "-translate-y-1/2 opacity-100" : "translate-y-full opacity-0"}
                ${window.location.pathname.includes('checkout') ? "translate-x-0 " : "-translate-x-full "}`}
            >
                <div className="flex items-center justify-between border-b border-b-neutral-400 pb-3">
                    {choice !== 'imageUpload' ?
                        <div className="flex gap-2 items-center justify-center flex-1">
                            <IoIosWarning size={25} className="text-yellow-400"/>
                            <h2 className="text-black font-medium text-xl">Warning</h2>
                        </div>
                        :
                        <div className="flex gap-2 items-center justify-center flex-1">
                            <FaCamera size={25} className="text-mainBlue"/>
                            <h2 className="text-black font-medium text-xl">Upload Image</h2>
                        </div>
                    }
                    <button
                        onClick={handleClose}
                    >
                        <FaX size={15} className="text-neutral-400 hover:text-black"/>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-5">
                    {choice !== 'imageUpload' ?
                        <p className="self-center text-center text-sm text-neutral-500 font-medium w-4/5">Are You Sure You Want to Delete This Information ?</p>
                        :
                        <p className="self-center text-center text-sm text-neutral-500 font-medium w-4/5">Are You Sure You Want to Change Your Photo ?</p>
                    }
                    <div className="flex flex-col">
                        <label htmlFor="password" className='text-black font-medium'>Password:</label>
                        <div
                            className="flex items-center justify-end border text-neutral-400 rounded-lg overflow-hidden"
                        >
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="******"
                                onChange={(e) => handleGetPassword(e)}
                                className="flex-1 px-3 py-1 focus:outline-none placeholder:text-neutral-400"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prevValue) => !prevValue)}
                                className="mr-3"
                            >
                                {showPassword ?
                                <FaEye size={15} className="hover:text-black transition duration-75" />
                                :
                                <FaEyeSlash size={15} className="hover:text-black transition duration-75" />
                                }
                            </button>
                        </div>
                    </div>
                    <Button>{choice !== 'imageUpload' ? "Delete" : "Upload"}</Button>
                </form>
            </div>
        </div>
    )
}

export default GetPassword;