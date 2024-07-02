import {
    ChangeEvent,
    FormEvent,
    useEffect,
    useState
} from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
    FaShippingFast
} from "react-icons/fa";
import {
    FaClockRotateLeft
} from "react-icons/fa6";
import { BsCreditCard } from "react-icons/bs";

import { completeOrderProps } from "../../../interfaces/OrderProps";
import { userProps } from "../../../interfaces/userProps";

import GetPassword from "./GetPassword";
import Welcome from "./Welcome";
import AddressBox from "./AddressBox";

interface dashboardUserContentProps {
    user: userProps | undefined,
    orders?: completeOrderProps[],
    setOption: (option: string) => void,
    correctedDate: string
}

const DashboardUserContent = ({ user, orders, setOption }: dashboardUserContentProps) => {
    const { userToken: token } = useParams();

    const [isOpen, setIsOpen] = useState(false);
    const [choice, setChoice] = useState('');
    const [preview, setPreview] = useState('');

    const [userData, setUserData] = useState<Omit<userProps, 'id' | 'role'>>({
        name: user?.name ?? '',
        email: user?.email ?? '',
        password: '',
        phoneNumber: user?.phoneNumber ?? '',
        address: user?.address ?? '',
        houseNumber: user?.houseNumber ?? undefined,
        city: user?.city ?? '',
        state: user?.state ?? '',
        postalCode: user?.postalCode ?? '',
        country: user?.country ?? '',
    });

    useEffect(() => {
        //Set The Image if user already Have One;
        if(user?.image){
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/public/images/user/${user.image}`);
        }
    }, [user?.image]);
    
    //Handle the request for delete user's address
    const handleDeleteAddress = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/user`);

        const formData = new FormData();
        const baseData = {
            name: String(userData.name),
            email: String(userData.email),
            password: String(userData.password),
            phoneNumber: String(userData.phoneNumber),
            address: String(userData.address),
            houseNumber: String(userData.houseNumber),
            city: String(userData.city),
            state: String(userData.state),
            postalCode: String(userData.postalCode),
            country: String(userData.country),
        };

        if(choice === 'deleteAddress'){
            Object.assign(baseData, {
                address: '',
                houseNumber: '',
                city: '',
                state: '',
                postalCode: '',
                country: ''
            });
        }

        Object.entries(baseData).forEach(([key, value]) => {
            formData.append(key, String(value));
        })

        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "authorization": `Bearer ${token}`
                },
                body: formData,
            });

            const resJson = await response.json();
            const { message } = resJson;

            if(!response.ok){
                toast.error(message);
                return;
            }

            toast.success(message);

            setTimeout(() => {
                setIsOpen(false);
                window.location.reload();
            }, 3000);
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    //Handle the request for delete user's credit Card
    const handleDeleteCreditCard = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    //Handle the Change of the file input
    const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            setUserData({...userData, 
                image: e.target.files[0]
            });
            const imageURL = URL.createObjectURL(e.target.files[0]);
            setPreview(imageURL);
            setTimeout(() => {
                handleChoice('imageUpload')
            }, 1500);
        }
    }

    //Handle the request to change user's Image 
    const handleImageChange = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();

        console.log(userData);

        Object.keys(userData).forEach((key) => {
            const value = userData[key as keyof Omit<userProps, 'id' | 'role'>];

            if(value instanceof File){
                formData.append('image', value);
            }else if(!value){
                formData.append(key, '');
            }else{
                formData.append(key, String(value))
            }
        });

        const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/user`);

        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "authorization": `Bearer ${token}`
                },
                body: formData
            });

            if(!response.ok){
                toast.error('Error Uploading Image!');
                return;
            }

            toast.success('Image Uploaded!');
        } catch (error) {
            console.log('Error: ', error);
        }
    }

     //Get the user's Password, and save it in a state, to send to backend with the Address | creditCard | ImageUpload Request
     const handleGetPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setUserData({
            ...userData,
            password: e.target.value
        });
    }

    //Handle the Choice, to check if the request is for image Upload | Delete Address | Delete Credit Card
    const handleChoice = (choice: string) => {
        setChoice(choice);
        setIsOpen(true);
    }

    //Based on the Choice, return's the function to made the request
    const getAction = (e: FormEvent<HTMLFormElement>) => {
        switch (choice) {
            case 'imageUpload':
                handleImageChange(e);
                break;
            case 'deleteCreditCard':
                handleDeleteCreditCard(e);
                break;
            case 'deleteAddress':
                handleDeleteAddress(e);
                break;
            default:
                null;
        }
    };

    //Check If user has all the address details by returning a boolean
    const hasAddressDetails = () => {
        return user?.address && user?.postalCode && user?.country && user?.city && user?.state;
    };

    return (
        <>
            <GetPassword
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                handleSubmit={(e) => getAction(e)}
                choice={choice}
                handleGetPassword={handleGetPassword}
            />
        {user && (
            <div className="flex gap-5 w-full pr-8">
                <div className="flex flex-col w-[620px]">
                    <Welcome 
                        preview={preview}
                        user={user}
                        handleFileInputChange={handleFileInputChange}
                        setOption={setOption}
                    />
                    <div className="flex gap-5 items-center bg-white rounded-xl p-5">
                        <span className="flex flex-col justify-center gap-3 flex-1">
                        <div className="flex items-center gap-7 mb-3 pb-2 border-b">
                            <FaClockRotateLeft size={30}/>
                            <h2 className="text-xl font-medium">Purchases Historic</h2>
                        </div>
                        <p className="text-lg">Purchases Already Made</p>
                        </span>
                    </div>
                </div>
                <div className="flex gap-5 w-2/5 max-w-[300px] max-h-[280px]">
                    {user.creditCard &&
                        <div className="flex flex-col gap-5 bg-white rounded-xl p-5 flex-1 min-w-[300px]">
                            <div className="flex items-center gap-3">
                                <BsCreditCard size={30}/>
                                <h2 className="text-xl font-medium">Cards</h2>
                            </div>
                            <div className="flex flex-col justify-between h-full">
                                <div className="flex flex-col gap-2 font-medium">
                                    <span className="text-lg">Ending In: {user.creditCard?.number.substring(15, user.creditCard.number.length)}</span>
                                    <span className="text-neutral-400">{user.creditCard?.bank} Bank</span>
                                    <span className="text-neutral-400">Expiration Date: {user.creditCard?.expiresAt}</span>
                                </div>
                                <div className="flex justify-between w-1/2 mx-auto text-[#2295E9] text-lg font-medium">
                                    <button
                                        onClick={() => setOption('profileConfig')} 
                                        className="hover:text-[#1678BE]"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleChoice('deleteCreditCard')}
                                        className="hover:text-[#1678BE]"
                                    >Delete</button>
                                </div>
                            </div>
                        </div>
                    }
                    {hasAddressDetails() &&
                        <AddressBox 
                            user={user}
                            editFunction={() => setOption('profileConfig')}
                            deleteFunction={() => handleChoice('deleteAddress')}
                            className="max-h-[300px]"
                        />
                    }
                </div>
            </div>
            )}
            <div className="bg-white rounded-xl p-5 w-[620px]">
                <div className="flex items-center gap-3 pb-2 border-b">
                    <FaShippingFast size={30}/>
                    <h2 className="text-xl font-medium">Your Last Order</h2>
                </div>
                <div className="mt-5">
                    {/* Get Only The Last Order */}
                    {orders && orders.length > 0 ? (
                        <div>
                            {orders[orders.length - 1].orderDetails?.orderProduct.map((product) => (
                            <div key={product.products.id} className="flex flex-1 justify-between font-medium mb-3">
                                <p>{product.products.name}</p>
                                <p>${product.products.price}</p>
                            </div>
                            ))}
                            <div className="flex flex-col gap-2 font-medium text-neutral-400 mt-6 pt-2 border-t border-t-neutral-300">
                            <p>Tracking Code: {orders[orders.length - 1].trackingCode}</p>
                            <p>Status: {orders[orders.length - 1].status}</p>
                            <p>Ordered At: {new Date(orders[orders.length - 1].date).toLocaleDateString()}</p>
                            </div>
                        </div>
                    )
                    : 
                    ( 
                        <div>
                            <p className="text-xl text-center mt-5">No Last Orders</p>
                          </div> 
                    )}
                </div>
            </div>
        </>
    )
}

export default DashboardUserContent;