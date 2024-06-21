import { ChangeEvent } from "react";
import { FaCamera } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";
import { IoLogoWhatsapp } from "react-icons/io";

import { userProps } from "../../../interfaces/userProps";

import { captilze } from "../../../utils/captalize";

interface welcomeProps {
    preview: string,
    user: userProps,
    handleFileInputChange: (e: ChangeEvent<HTMLInputElement>) => void,
    setOption: (option: string) => void
}

const Welcome = ({ preview, user, handleFileInputChange, setOption }: welcomeProps) => {
    return (
        <section className="relative flex items-center gap-10 bg-white p-3 rounded-xl mb-5 w-[620px] h-full">
            <div className="flex flex-col items-end gap-2">
                <div className="relative ml-8">
                    <div className="flex items-center justify-center rounded-full bg-neutral-400 h-16 w-16 overflow-hidden">
                        {!preview ?
                            <span className="font-bold text-3xl">{captilze(user.name[0])}</span>
                            :
                            <img src={preview} alt="User Profile Image" />
                        }
                    </div>
                    <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/jpg, image/jpeg, image/png"
                        onChange={(e) => handleFileInputChange(e)}
                        className="appearance-none text-transparent file:border-none file:cursor-pointer file:text-transparent file:bg-transparent absolute top-3/4 right-0 z-20 max-w-6 max-h-6"
                    />
                    <FaCamera size={20} className="absolute top-3/4 right-0 z-30 pointer-events-none" />
                </div>
                <span className="font-medium text-neutral-400 text-sm pr-3">{user.role}</span>
            </div>
            <div>
                <h2 className="text-2xl font-medium mb-2">Welcome, {user.name}</h2>
                <span className="flex items-center gap-2">
                    <TfiEmail size={15}/> {user.email}
                </span>
                <span className="flex items-center gap-2">
                    <IoLogoWhatsapp size={15}/> {user.phoneNumber ? user.phoneNumber : "Not Setted"}
                </span>
            </div>
            <button
                onClick={() => setOption('profileConfig')}
                className="absolute right-5 text-[#2295E9]"
            >
                <FaGear size={30} className="hover:rotate-90 duration-150"/>
            </button>
        </section>
    )
}

export default Welcome;