import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

//import { IoLocationSharp } from "react-icons/io5";
import { MdAddLocation } from "react-icons/md";

import { userProps } from "../../../interfaces/userProps";

import DeliveryMethodForm from "./DeliveryMethodForm";
import Button from "../../Layout/Button";
import GetPassword from "../Profile/GetPassword";
import { FieldValues, SubmitHandler } from "react-hook-form";
import AddressBox from "../Profile/AddressBox";

interface deliveryMethodProps {
    setNextStep: (step: string) => void
}

const DeliveryMethod = ({ setNextStep }: deliveryMethodProps) => {
    const { userToken: token } = useParams();

    const [userData, setUserData] = useState<Omit<userProps, 'id'>>();
    const [editInfo, setEditInfo] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(true);

    const [isOpen, setIsOpen] = useState(false);
    
    //fetch the user data to be able to pass to the form component and render the user's current address
    useEffect(() => {
        const fetchUserData = async () => {
            const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/user`);

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            });

            if(response.ok){
                const resJson = await response.json();
                const { user } = resJson;
                setUserData(user);
            }
        }

        fetchUserData();
    }, [token]);

    //Get the user's password, to check before removing the data
    const handleGetPassword = (e: ChangeEvent<HTMLInputElement>) => {
        if(userData){
            setUserData({
                ...userData,
                password: e.target.value
            });
        }
    }

    //Remove user's address from the database
    const handleDelete = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/user`);

        const formData = new FormData();
        const baseData = {
            name: String(userData?.name),
            email: String(userData?.email),
            password: String(userData?.password),
            phoneNumber: String(userData?.phoneNumber),
            address: String(userData?.address),
            houseNumber: String(userData?.houseNumber),
            city: String(userData?.city),
            state: String(userData?.state),
            postalCode: String(userData?.postalCode),
            country: String(userData?.country),
            // creditCard: String(userData.creditCard)
        };

        Object.assign(baseData, {
            address: '',
            houseNumber: '',
            city: '',
            state: '',
            postalCode: '',
            country: ''
        });

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

    //Update the user's data, according to the information passed in the form, before proceeding with the payment
    const submitData: SubmitHandler<FieldValues> = async (data) => {
        const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/user`);

        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, String(value));
        });

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

    //Check If user has all the address details by returning a boolean
    const hasAddressDetails = () => {
        return userData?.address && userData?.postalCode && userData?.country && userData?.city && userData?.state;
    };
  
    return userData && (
        <>
            <GetPassword
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                handleSubmit={handleDelete}
                choice={'deleteAddress'}
                handleGetPassword={handleGetPassword}
            />
            <div className={`flex flex-col mx-auto bg-white rounded-2xl p-5 ${!hasAddressDetails() || editInfo ? "w-2/5" : "w-2/4"}`}>
                <h1 className="text-xl text-black font-medium mb-8">Choose the Delivery Method</h1>
                {!hasAddressDetails() || editInfo ?  
                    (<DeliveryMethodForm
                        userData={userData}
                        submitData={submitData}
                        setEditInfo={setEditInfo}
                    />)
                :
                (<div className="flex flex-wrap justify-center gap-6">
                    <div
                        onClick={() => setSelectedAddress((prevValue) => !prevValue)}
                        className={`border rounded-2xl overflow-hidden 
                            ${selectedAddress ? "border-[#2295E9] " : "border-neutral-400"}`
                        }
                    >
                        <AddressBox 
                            user={userData}
                            editFunction={() => setEditInfo(true)}
                            deleteFunction={() => setIsOpen(true)}
                            className="max-h-[300px]"
                        />
                        {/* <div className="flex flex-col gap-5 bg-white text-black p-5 flex-1 min-w-[300px]">
                            <div className="flex items-center gap-3">
                                <IoLocationSharp size={30}/>
                                <h2 className="text-xl font-medium">Adresses</h2>
                            </div>
                            <div className="flex flex-col justify-between h-full">
                                <div className="flex flex-col gap-2 font-medium">
                                    <span>Street: {userData.address}, {userData.houseNumber}</span>
                                    <span className="text-neutral-400">Postal Code: {userData.postalCode}</span>
                                    <span className="text-neutral-400">{userData.city} - {userData.state} | {userData.country}</span>
                                </div>
                                <div className="flex justify-between w-1/2 mx-auto text-[#2295E9] text-lg font-medium mt-3">
                                    <button
                                        onClick={() => setEditInfo(true)}
                                        className="hover:text-[#1678BE]"
                                    >Edit</button>
                                    <button 
                                        onClick={() => setIsOpen(true)}
                                        className="hover:text-[#1678BE]"
                                    >Delete
                                    </button>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    <div className="border border-neutral-400 rounded-2xl overflow-hidden">
                        <div className="flex flex-col gap-5 bg-white text-black p-5 flex-1 min-w-[300px]">
                            <div className="flex flex-col items-center gap-3">
                                <MdAddLocation size={45}/>
                                <h2 className="text-xl font-medium">Add Address</h2>
                            </div>
                        </div>
                    </div>
                </div>
                )}
                <div className="flex mt-8">
                    <Button
                        onClick={() => setNextStep('paymentmethod')}
                        className="flex-1"
                    >
                        Continue
                    </Button>
                </div>
            </div>
        </>
    )
}

export default DeliveryMethod;