import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { 
    useForm,
    FieldValues,
    SubmitHandler
} from "react-hook-form";
import { FaX } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";

import { ChatBoxModalContext } from "../../Context/ChatBoxContext";

import { userProps } from "../../interfaces/userProps";

import Button from "./Button";
//import { useParams } from "react-router-dom";

interface chatBoxProps {
    user: userProps | undefined
}

const ChatBox = ({ user }: chatBoxProps) => {
    const { isOpen, setIsOpen } = useContext(ChatBoxModalContext);
    //const { userToken: token } = useParams();

    const [showModal, setShowModal] = useState<boolean>(isOpen);
    const [allMessages, setAllMessages] = useState<{ 
        user: { userId: number, name: string }, 
        text: string, 
        createdAt: Date, 
    }[]>([]);

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            text: ''
        }
    })
    
    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = () => {
        setShowModal(false);

        setTimeout(() => {
            setIsOpen(false);
        }, 300);
    }

    //Setting the chat inicial data
    const chatData = useMemo(() =>[
        {
            id: 1,
            user: {
                userId: 1,
                name: 'luis'
            },
            messages: [
                {
                    text:'hello',
                    createdAt: new Date('2024-06-17T10:01:00Z')
                }, 
                {
                    text:'how are you ?',
                    createdAt: new Date('2024-06-17T10:03:00Z')
                },
                {
                    text:'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                    createdAt: new Date('2024-06-17T10:05:00Z')
                }
            ]
        },
        {
            id: 2,
            user: {
                userId: 3,
                name: 'joão'
            },
            messages: [
                {
                    text:'hy',
                    createdAt: new Date('2024-06-17T10:02:00Z')
                } , 
                {
                    text:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti beatae laudantium soluta odit sequi quae, sed at exercitationem dolorem',
                    createdAt: new Date('2024-06-17T10:04:00Z')
                }
            ]
        },
    ], [])

    //Sending the message and storing in the Array
    const handleSendMessage:SubmitHandler<FieldValues> = (value) => {
        //ToDo: Integrate with GPT's API
        if(!user){
            return;
        }
        chatData.find((data) => data.user.userId === user.id)?.messages.push({
            text: value.text,
            createdAt: new Date(Date.now())
        });
        renderMessages();
    }

    //Update the "allMessages" State to trigger the render in the window
    const renderMessages = useCallback(() => {
        setAllMessages(() => chatData.flatMap(data => 
            data.messages.map(message => ({
                ...message,
                user: data.user
            }))
        ));
    }, [chatData]);

    useEffect(() => {
        renderMessages();
    }, [renderMessages]);

    // const handleMessageSubmit: SubmitHandler<FieldValues> = async (data) => {
    //     const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/chat`);

    //     const response = await fetch(url, {
    //         method: "POST",
    //         headers: {
    //             "content-type": "application/json",
    //             "authorization": `Bearer ${token}`
    //         },
    //         body: JSON.stringify(data),
    //     });

    //     const resJson = await response.json();

    //     if(response.ok){
    //         const { message } = resJson;
    //         console.log(message);
    //     }
    // }

    return (
        <div className={isOpen ? "fixed bottom-5 right-5 z-50 flex items-center justify-center" : "hidden"}>
            <div 
                className={`flex flex-col justify-start rounded-2xl text-black border bg-white p-3 transition duration-300 max-w-80 
                ${showModal ? "-translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
            >
                <div className="flex items-center mb-2 pb-2 border-b border-b-neutral-400">
                    <div className="flex-1">
                        <h2 className="text-center font-medium text-lg">Chat</h2>
                    </div>
                    <button
                        onClick={handleClose}
                        className="text-neutral-400 hover:text-black"
                    >
                        <FaX size={15} />
                    </button>
                </div>
                <div className="flex flex-col flex-1">
                    <div className="flex-1 overflow-y-scroll max-h-[300px] pr-1">
                        {allMessages
                        .sort((messageA, messageB) => messageA.createdAt < messageB.createdAt ? -1 : 1)
                        .map((data, index) => (
                            <div key={index} className="flex flex-col">
                                <div className={`flex items-center gap-3 mb-3 ${user?.id === data.user.userId ? "self-end" : "self-start"}`}>
                                    <div 
                                        className={`relative rounded-xl py-2 px-3 w-fit 
                                        ${user?.id === data.user.userId ? "bg-neutral-200" : "bg-blue-200"}`}
                                    >
                                            <div className={`absolute w-2 h-2 top-0 ${user?.id === data.user.userId ? "right-0 bg-neutral-200" : "left-0 bg-blue-200"}`}></div>
                                            <p className="text-wrap">{data.text} </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleSubmit(handleSendMessage)} className="flex gap-3 mt-3">
                        <input 
                            {...register('text', { required: true })}
                            type="text"
                            placeholder="Type Message..."
                            className={`flex-1 border rounded-2xl py-1 px-3 text-neutral-400 placeholder:text-neutral-400 focus:outline-none ${errors['text'] ? "border-rose-500" : "border-neutral-400"}`}
                        />
                        <Button
                            type="submit"
                        >
                            <IoIosSend size={20}/>
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChatBox;