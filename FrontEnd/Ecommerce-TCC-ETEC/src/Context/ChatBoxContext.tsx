import { 
    createContext, 
    Dispatch, 
    SetStateAction, 
    useState 
} from "react";

interface chatBoxContextProps {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

//Create a Context For the Chat Modal
export const ChatBoxModalContext = createContext<chatBoxContextProps>({
    isOpen: false,
    setIsOpen: () => void 0
});

//Create a Provider For the Context of the Chat Modal
export const ChatBoxModalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <ChatBoxModalContext.Provider value={{ isOpen, setIsOpen }}>
            { children }
        </ChatBoxModalContext.Provider>
    )
}