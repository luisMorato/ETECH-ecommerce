import { 
    createContext, 
    Dispatch, 
    SetStateAction, 
    useState
} from "react";

type LoginModalContextProps = {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
}

export const LoginModalContext = createContext<LoginModalContextProps>({
    isOpen: false,
    setIsOpen: () => void 0,
});

export const LoginModalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <LoginModalContext.Provider value={{ isOpen, setIsOpen }}>
            { children }
        </LoginModalContext.Provider>
    );
}