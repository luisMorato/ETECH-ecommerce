import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { userProps } from "../interfaces/userProps";

interface authContextprops {
    isSignedIn: boolean,
    setIsSignedIn: Dispatch<SetStateAction<boolean>>,
    user: userProps | undefined,
    setUser: Dispatch<SetStateAction<userProps | undefined>>
}

const AuthContext = createContext< authContextprops | null >({
    isSignedIn: false,
    setIsSignedIn: () => void 0,
    user: undefined,
    setUser: () => void 0
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [user, setUser] = useState<userProps | undefined>(undefined);
    
    return (
        <AuthContext.Provider value={{ isSignedIn, setIsSignedIn, user, setUser }}>
            { children }
        </AuthContext.Provider>
    )
}

export const UseAuth = () => {
    const context = useContext(AuthContext);

    if(context === undefined){
        throw new Error('Error Using UseAuth, it must be used with AuthProvider');
    }

    return context;
}