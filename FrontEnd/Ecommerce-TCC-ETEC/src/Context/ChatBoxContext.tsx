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

export const ChatBoxModalContext = createContext<chatBoxContextProps>({
    isOpen: false,
    setIsOpen: () => void 0
});

export const ChatBoxModalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <ChatBoxModalContext.Provider value={{ isOpen, setIsOpen }}>
            { children }
        </ChatBoxModalContext.Provider>
    )
}