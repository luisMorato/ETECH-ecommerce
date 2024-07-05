import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export const UseAuth = () => {
    const context = useContext(AuthContext);

    if(context === undefined){
        throw new Error('Error Using UseAuth, it must be used with AuthProvider');
    }

    const { user } = context;

    return { user };
}