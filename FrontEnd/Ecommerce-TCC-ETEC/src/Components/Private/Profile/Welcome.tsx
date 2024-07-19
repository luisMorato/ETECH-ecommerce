import { ChangeEvent, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";
import { IoLogoWhatsapp } from "react-icons/io";

import { userProps } from "../../../interfaces/userProps";

import { captilze } from "../../../utils/captalize";
import { checkTextLength } from "../../../utils/checkTextLength";

interface welcomeProps {
    preview: string,
    user: userProps,
    handleFileInputChange: (e: ChangeEvent<HTMLInputElement>) => void,
    setOption: (option: string) => void
}

const Welcome = ({ preview, user, handleFileInputChange, setOption }: welcomeProps) => {
    const [currentWindowWidth, setCurrentWindowWidth] = useState(window.innerWidth);
    
    window.addEventListener('resize', () => {
        setCurrentWindowWidth(window.innerWidth);
    })

    return (
        <section 
            className="relative flex max-sm:flex-col flex-1 items-center gap-3 bg-white py-3 px-5 rounded-xl mb-5
            md:gap-5"
        >
            <div className="flex flex-col items-center gap-2">
                <div className="relative">
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
                    <FaCamera size={20} className="absolute top-3/4 right-0 z-20 pointer-events-none" />
                </div>
                <p className="font-medium text-neutral-400 text-sm text-center">{user.role}</p>
            </div>
            <div className="flex items-center justify-between flex-1">
                <div>
                    <h2 className="text-2xl font-medium mb-2">Welcome, {user.name}</h2>
                    <span className="flex items-center gap-2">
                        <TfiEmail size={15} />
                        <span>{currentWindowWidth < 450 && user.email.length > 30 ? checkTextLength(user.email, 25) : user.email}</span>
                    </span>
                    <span className="flex items-center gap-2">
                        <IoLogoWhatsapp size={15} /> {user.phoneNumber ? user.phoneNumber : "Not Setted"}
                    </span>
                </div>
                <button
                    onClick={() => setOption('profileConfig')}
                    className="text-mainBlue max-sm:absolute right-5 top-5"
                >
                    <FaGear size={30} className="hover:rotate-90 duration-150"/>
                </button>
            </div>
        </section>
    )
}

export default Welcome;