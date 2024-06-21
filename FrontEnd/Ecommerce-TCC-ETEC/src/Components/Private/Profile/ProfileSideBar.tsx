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

interface profileSideBarProps {
    user: Omit<userProps, 'password'> | undefined
}

const ProfileSideBar = ({ user }: profileSideBarProps) => {
    const currentUrl = new URL(window.location.toString());
    
    const option = currentUrl.searchParams.get('option') ?? 'dashboard';

    const setOption = (option: string) => {
        currentUrl.searchParams.set('option', option);
        window.history.pushState(null, '', currentUrl);
        window.location.reload();
    }
  
    return (
    <aside>
        <ul>
            <ListItem 
                isSelected={option === 'dashboard'}
                className="cursor-pointer"
            >
                <button
                    onClick={() => setOption('dashboard')} 
                    className="flex items-center gap-3 py-1.5 font-medium"
                >
                    <FaHouseChimney size={20} className="text-[#2295E9]"/> Dashboard
                </button>
            </ListItem>
            <ListItem
                isSelected={option === 'profileConfig'} 
                className="cursor-pointer"
            >
                <button
                    onClick={() => setOption('profileConfig')} 
                    className="flex items-center gap-3 py-1.5 font-medium"
                >
                    <FaUser size={20} className="text-[#2295E9]"/> Profile Config
                </button>
            </ListItem>
            {user?.role !== "ADMIN" && <ListItem
                isSelected={option === 'myoders'}  
                className="cursor-pointer"
            >
                <button
                    onClick={() => setOption('myoders')} 
                    className="flex items-center gap-3 py-1.5 font-medium"
                >
                    <FaShoppingBasket size={20} className="text-[#2295E9]"/> My Orders
                </button>
            </ListItem>}
            {user?.role === "ADMIN" && (
                <>
                    <ListItem
                        isSelected={option === 'registerProduct'}  
                        className="cursor-pointer"
                    >
                        <button
                            onClick={() => setOption('registerProduct')}
                            className="flex items-center gap-3 py-1.5 font-medium"
                        >
                            <FaClipboardList size={20} className="text-[#2295E9]"/> Register Product
                        </button>
                    </ListItem>
                    <ListItem
                        isSelected={option === 'allProducts'}  
                        className="cursor-pointer"
                    >
                        <button
                            onClick={() => setOption('allProducts')}
                            className="flex items-center gap-3 py-1.5 font-medium"
                        >
                            <FaListUl size={20} className="text-[#2295E9]"/> Products
                        </button>
                    </ListItem>
                    <ListItem
                        isSelected={option === 'usersList'}  
                        className="cursor-pointer"
                    >
                        <button
                            onClick={() => setOption('usersList')}
                            className="flex items-center gap-3 py-1.5 font-medium"
                        >
                            <PiUserListFill size={20} className="text-[#2295E9]"/> Users
                        </button>
                    </ListItem>
                    <ListItem
                        isSelected={option === 'salesStatistics'} 
                        className="cursor-pointer"
                    >
                        <button
                            onClick={() => setOption('salesStatistics')} 
                            className="flex items-center gap-3 py-1.5 font-medium"
                        >
                            <BsGraphUp size={20} className="text-[#2295E9]"/> Sales Statistics
                        </button>
                    </ListItem>
                </>
            )}
        </ul>
    </aside>
  )
}

export default ProfileSideBar;