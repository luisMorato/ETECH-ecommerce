import { ComponentProps } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

import { userProps } from "../../../interfaces/userProps";

interface addressBoxProps extends ComponentProps<'div'>{
    user: Omit<userProps, 'id' | 'password'>,
    editFunction?:() => void,
    deleteFunction?: () => void
}

const AddressBox = ({ user, editFunction, deleteFunction, ...props }: addressBoxProps) => {
    return (
        <div className={twMerge("flex flex-col gap-5 bg-white rounded-xl p-5 flex-1 min-w-[300px]", props.className)}>
            <div className="flex items-center gap-3 text-black">
                <IoLocationSharp size={30}/>
                <h2 className="text-xl font-medium">Adresses</h2>
            </div>
            <div className="flex flex-col justify-between h-full">
                <div className="flex flex-col gap-2 font-medium">
                    <span className="text-black">Street: {user.address}, {user.houseNumber}</span>
                    <span className="text-neutral-400">Postal Code: {user.postalCode}</span>
                    <span className="text-neutral-400">{user.city} - {user.state} | {user.country}</span>
                </div>
                {editFunction && deleteFunction && (
                    <div className="flex justify-between w-1/2 mx-auto text-[#2295E9] text-lg font-medium mt-3">
                        <button 
                            className="hover:text-[#1678BE]" 
                            onClick={editFunction}
                        >Edit</button>
                        <button 
                            className="hover:text-[#1678BE]"
                            onClick={deleteFunction}
                        >Delete</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AddressBox;