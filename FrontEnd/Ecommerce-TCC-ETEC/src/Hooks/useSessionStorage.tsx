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
    const [token, setToken] = useState<string>(() => {
        return sessionStorage.getItem(key) || "";
    });

    useEffect(() => {
        sessionStorage.setItem(key, token);
    }, [token, key]);

    return {
        token,
        setToken
    }
}