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
    userImage?: string,
    order?: completeOrderProps,
    setOption: (option: string) => void,
    correctedDate: string
}

const DashboardUserContent = ({ user, userImage, order, setOption, correctedDate }: dashboardUserContentProps) => {
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
        if(userImage){
            setPreview(userImage);
        }
    }, [userImage]);
    
    const handleDelete = async (e: FormEvent<HTMLFormElement>) => {
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
            // creditCard: String(userData.creditCard) // Inclua aqui se for necessário em ambos os casos
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

        if(choice === 'deleteCreditCard'){
            Object.assign(baseData, {
              //creditCard: ''
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

    const handleGetPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setUserData({
            ...userData,
            password: e.target.value
        });
    }

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

    const handleImageChange = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();

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

    const handleChoice = (choice: string) => {
        setChoice(choice);
        setIsOpen(true);
    }

    const hasAddressDetails = () => {
        return user?.address && user?.postalCode && user?.country && user?.city && user?.state;
    };

    return (
        <>
            <GetPassword
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                handleSubmit={choice !== 'imageUpload' ? handleDelete : handleImageChange}
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
                    <div className="flex flex-col gap-5 bg-white rounded-xl p-5 flex-1 min-w-[300px]">
                        <div className="flex items-center gap-3">
                            <BsCreditCard size={30}/>
                            <h2 className="text-xl font-medium">Cards</h2>
                        </div>
                        <div className="flex flex-col justify-between h-full">
                            <div className="flex flex-col gap-2 font-medium">
                                <span className="text-lg">Ending In: 4593</span>
                                <span className="text-neutral-400">Itaú Bank</span>
                                <span className="text-neutral-400">Expiration Date: {correctedDate}</span>
                            </div>
                            <div className="flex justify-between w-1/2 mx-auto text-[#2295E9] text-lg font-medium">
                                <button className="hover:text-[#1678BE]">Edit</button>
                                <button
                                    onClick={() => handleChoice('deleteCreditCard')}
                                    className="hover:text-[#1678BE]"
                                >Delete</button>
                            </div>
                        </div>
                    </div>
                    {hasAddressDetails() &&
                        <AddressBox 
                            user={user}
                            setOption={setOption}
                            handleChoice={handleChoice}
                            className="max-h-[300px]"
                        />
                    }
                </div>
            </div>
            )}
            <div className="bg-white rounded-xl p-5 w-[620px]">
                <div className="flex items-center gap-3 pb-2 border-b">
                    <FaShippingFast size={30}/>
                    <h2 className="text-xl font-medium">Your Last Orders</h2>
                </div>
                <div className="mt-5">
                    {order ? (
                        <div>
                            {order.orderDetails?.cartProducts.map((cartProduct) => (
                            <div key={cartProduct.products.id} className="flex flex-1 justify-between font-medium mb-3">
                                <p>{cartProduct.products.name}</p>
                                <p>${cartProduct.products.price}</p>
                            </div>
                            ))}
                            <div className="flex flex-col gap-2 font-medium text-neutral-400 mt-6 pt-2 border-t border-t-neutral-300">
                            <p>Tracking Code: {order.trackingCode}</p>
                            <p>Status: {order.status}</p>
                            <p>Ordered At: {new Date(order.date).toLocaleDateString()}</p>
                            </div>
                        </div>)
                        : 
                        ( <span className="text-lg">No Orders</span> )
                    }
                </div>
            </div>
        </>
    )
}

export default DashboardUserContent;