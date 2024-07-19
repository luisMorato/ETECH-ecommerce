import { FaHouseChimney } from "react-icons/fa6";
import { 
    FaUser,
    FaShoppingBasket, 
    FaClipboardList,
    FaListUl
} from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { PiUserListFill } from "react-icons/pi";

import ListItem from "../../Layout/ListItem";
import { userProps } from "../../../interfaces/userProps";
import { setUrlParam } from "../../../utils/SetUrlParam";

interface profileSideBarProps {
    user: Omit<userProps, 'password'> | undefined
}

const ProfileSideBar = ({ user }: profileSideBarProps) => {
    const currentUrl = new URL(window.location.toString());
    const option = currentUrl.searchParams.get('option') ?? 'dashboard';
  
    return (
        <aside className="flex-1 bg-white max-w-[50px] max-lg:min-w-[50px] lg:max-w-[200px] xl:min-w-[180px]">
            <ul>
                <ListItem
                    to="#"
                    isSelected={option === 'dashboard'}
                    className="cursor-pointer"
                >
                    <button
                        onClick={() => setUrlParam("option", "dashboard")} 
                        className="flex items-center justify-center gap-3 py-1.5 font-medium w-full lg:w-fit lg:justify-start"
                    >
                        <FaHouseChimney size={20} className="text-mainBlue shrink-0"/> 
                        <span className="hidden lg:block">Dashboard</span>
                    </button>
                </ListItem>
                <ListItem
                    to="#"
                    isSelected={option === 'profileConfig'} 
                    className="cursor-pointer"
                >
                    <button
                        onClick={() => setUrlParam("option", "profileConfig")} 
                        className="flex items-center justify-center gap-3 py-1.5 font-medium w-full lg:w-fit lg:justify-start"
                    >
                        <FaUser size={20} className="text-mainBlue shrink-0"/> 
                        <span className="hidden lg:block">Profile Config</span>
                    </button>
                </ListItem>
                {user?.role !== "ADMIN" && 
                    <ListItem
                        to="#"
                        isSelected={option === 'myoders'}  
                        className="cursor-pointer"
                    >
                        <button
                            onClick={() => setUrlParam("option", "myoders")} 
                            className="flex items-center justify-center gap-3 py-1.5 font-medium w-full lg:w-fit lg:justify-start"
                        >
                            <FaShoppingBasket size={20} className="text-mainBlue shrink-0"/> 
                            <span className="hidden lg:block">My Orders</span>
                        </button>
                    </ListItem>
                }
                {user?.role === "ADMIN" && (
                    <>
                        <ListItem
                            to="#"
                            isSelected={option === 'registerProduct'}  
                            className="cursor-pointer"
                        >
                            <button
                                onClick={() => setUrlParam("option", "registerProduct")}
                                className="flex items-center justify-center gap-3 py-1.5 font-medium w-full lg:w-fit lg:justify-start"
                            >
                                <FaClipboardList size={20} className="text-mainBlue shrink-0"/> 
                                <span className="hidden lg:block">Register Product</span>
                            </button>
                        </ListItem>
                        <ListItem
                            to="#"
                            isSelected={option === 'allProducts'}  
                            className="cursor-pointer"
                        >
                            <button
                                onClick={() => setUrlParam("option", "allProducts")}
                                className="flex items-center justify-center gap-3 py-1.5 font-medium w-full lg:w-fit lg:justify-start"
                            >
                                <FaListUl size={20} className="text-mainBlue shrink-0"/> 
                                <span className="hidden lg:block">Products</span>
                            </button>
                        </ListItem>
                        <ListItem
                            to="#"
                            isSelected={option === 'usersList'}  
                            className="cursor-pointer"
                        >
                            <button
                                onClick={() => setUrlParam("option", "usersList")}
                                className="flex items-center justify-center gap-3 py-1.5 font-medium w-full lg:w-fit lg:justify-start"
                            >
                                <PiUserListFill size={20} className="text-mainBlue shrink-0"/> 
                                <span className="hidden lg:block">Users</span>
                            </button>
                        </ListItem>
                        <ListItem
                            to="#"
                            isSelected={option === 'salesStatistics'} 
                            className="cursor-pointer"
                        >
                            <button
                                onClick={() => setUrlParam("option", "salesStatistics")} 
                                className="flex items-center justify-center gap-3 py-1.5 font-medium w-full lg:w-fit lg:justify-start"
                            >
                                <BsGraphUp size={20} className="text-mainBlue shrink-0"/> 
                                <span className="hidden lg:block">Sales Statistics</span>
                            </button>
                        </ListItem>
                    </>
                )}
            </ul>
        </aside>
    )
}

export default ProfileSideBar;