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

    //Set some Option From the SideBar and keep it in the URL, 
    //to enable the User to see different contents in the profile page and persist the reloads
    // const setOption = (option: string) => {
    //     currentUrl.searchParams.set('option', option);
    //     window.history.pushState(null, '', currentUrl);
    //     window.location.reload();
    // }
  
    return (
        <aside>
            <ul>
                <ListItem
                    to={""}
                    isSelected={option === 'dashboard'}
                    className="cursor-pointer"
                >
                    <button
                        onClick={() => setUrlParam("option", "dashboard")} 
                        className="flex items-center gap-3 py-1.5 font-medium"
                    >
                        <FaHouseChimney size={20} className="text-mainBlue"/> Dashboard
                    </button>
                </ListItem>
                <ListItem
                    to={""}
                    isSelected={option === 'profileConfig'} 
                    className="cursor-pointer"
                >
                    <button
                        onClick={() => setUrlParam("option", "profileConfig")} 
                        className="flex items-center gap-3 py-1.5 font-medium"
                    >
                        <FaUser size={20} className="text-mainBlue"/> Profile Config
                    </button>
                </ListItem>
                {user?.role !== "ADMIN" && 
                <ListItem
                    to={""}
                    isSelected={option === 'myoders'}  
                    className="cursor-pointer"
                >
                    <button
                        onClick={() => setUrlParam("option", "myoders")} 
                        className="flex items-center gap-3 py-1.5 font-medium"
                    >
                        <FaShoppingBasket size={20} className="text-mainBlue"/> My Orders
                    </button>
                </ListItem>}
                {user?.role === "ADMIN" && (
                    <>
                        <ListItem
                            to={""}
                            isSelected={option === 'registerProduct'}  
                            className="cursor-pointer"
                        >
                            <button
                                onClick={() => setUrlParam("option", "registerProduct")}
                                className="flex items-center gap-3 py-1.5 font-medium"
                            >
                                <FaClipboardList size={20} className="text-mainBlue"/> Register Product
                            </button>
                        </ListItem>
                        <ListItem
                            to={""}
                            isSelected={option === 'allProducts'}  
                            className="cursor-pointer"
                        >
                            <button
                                onClick={() => setUrlParam("option", "allProducts")}
                                className="flex items-center gap-3 py-1.5 font-medium"
                            >
                                <FaListUl size={20} className="text-mainBlue"/> Products
                            </button>
                        </ListItem>
                        <ListItem
                            to={""}
                            isSelected={option === 'usersList'}  
                            className="cursor-pointer"
                        >
                            <button
                                onClick={() => setUrlParam("option", "usersList")}
                                className="flex items-center gap-3 py-1.5 font-medium"
                            >
                                <PiUserListFill size={20} className="text-mainBlue"/> Users
                            </button>
                        </ListItem>
                        <ListItem
                            to={""}
                            isSelected={option === 'salesStatistics'} 
                            className="cursor-pointer"
                        >
                            <button
                                onClick={() => setUrlParam("option", "salesStatistics")} 
                                className="flex items-center gap-3 py-1.5 font-medium"
                            >
                                <BsGraphUp size={20} className="text-mainBlue"/> Sales Statistics
                            </button>
                        </ListItem>
                    </>
                )}
            </ul>
        </aside>
    )
}

export default ProfileSideBar;