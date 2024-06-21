import { useState } from "react";
import { IoIosMail } from "react-icons/io";
import { CiBellOn } from "react-icons/ci";
import { FiMenu } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";

import { userProps } from "../../interfaces/userProps";

import ListItem from "./ListItem";

interface userButtonsProps {
    user?: userProps,
    userImage: string,
    signOut: () => void,
    token: string | undefined
}

const UserButtons = ({ user, userImage, signOut, token }: userButtonsProps) => {
    const [openUserMenu, setOpenUserMenu] = useState(false);

    return (
        <div className="flex items-center gap-5">
            {user?.role === "ADMIN" &&
              <div className="flex gap-3 items-center translate-y-1">
                <div className="relative">
                    <div className="absolute -top-0.5 -right-1 bg-[#1678BE] w-2 h-2 rounded-full"></div>
                    <button
                        className="cursor-pointer hover:scale-110"
                    >
                      <IoIosMail size={30} className="text-mainBlue"/>
                    </button>
                </div>
                <div className="relative">
                    <div className="absolute -top-0.5 -right-1 bg-[#1678BE] w-2 h-2 rounded-full"></div>
                    <button
                        className="cursor-pointer hover:scale-110"
                    >
                      <CiBellOn size={25} className="text-mainBlue"/>
                    </button>
                </div>
              </div>
            }
            <button
              onClick={() => setOpenUserMenu((prevValue) => !prevValue)} 
              className="flex items-center gap-3 text-neutral-400 border border-neutral-300 rounded-full p-1 overflow-hidden h-fit hover:scale-105"
            >
                <span className="bg-neutral-300 flex items-center justify-center rounded-full h-9 w-9 overflow-hidden">
                    {!userImage ?
                      <FaUserAlt size={25} className="text-neutral-400/70"/>
                      :
                      <img src={userImage} alt={`${user?.name}-image`}/>
                    }
                </span>
                <span className="-translate-x-2 border-l border-l-neutral-300 pl-2 ml-1">
                    <FiMenu size={25}/>
                </span>
            </button>
            {openUserMenu && 
            (<div className="absolute top-full translate-y-1 right-0 z-30 w-[120px] border border-neutral-400/50 bg-white rounded-2xl overflow-hidden">
              <ul>
                <ListItem className="font-medium" href={`/profile/${token}`}>Profile</ListItem>
                <ListItem className="font-medium">
                  <button onClick={signOut}>Sign Out</button>
                </ListItem>
              </ul>
            </div>)}
        </div>
    )
}

export default UserButtons;