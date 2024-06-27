import { 
    SetStateAction,
    useEffect, 
    useState
} from "react";

interface useSessionStorageProps {
    token: string,
    setToken: React.Dispatch<SetStateAction<string>> 
}

export const UseSessionStorage = (key: string): useSessionStorageProps => {
    //Gets the token that is stored in the session, if it has any
    const [token, setToken] = useState<string>(() => {
        return sessionStorage.getItem(key) || "";
    });

    //Set the token in the session storage, everytime the Token changes
    useEffect(() => {
        sessionStorage.setItem(key, token);
    }, [token, key]);

    //Return the Updated Value of the token stored in the Session, and also returns the function to set it
    return {
        token,
        setToken
    }
}