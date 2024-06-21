import { 
    createContext, 
    Dispatch, 
    SetStateAction, 
    useState
} from "react";

type registerModalContextProps = {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
}

export const RegisterModalContext = createContext<registerModalContextProps>({
    isOpen: false,
    setIsOpen: () => void 0
});

export const RegisterModalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <RegisterModalContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </RegisterModalContext.Provider>
    );
}