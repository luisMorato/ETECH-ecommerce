import {
    createContext,
    useEffect,
    useState
} from "react";
import { userProps } from "../interfaces/userProps";
import { UseSessionStorage } from "../Hooks/useSessionStorage";

interface authContextprops {
    user: userProps | undefined,
}

export const AuthContext = createContext< authContextprops | undefined >({
    user: undefined,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { token } = UseSessionStorage('token');
    const [user, setUser] = useState<userProps | undefined>(undefined);

    useEffect(() => {
        const fetchUser = async () => {
            if(!token){
                return;
            }

            const url = `${import.meta.env.VITE_BACKEND_URL}/user`;

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            });

            const resJson = await response.json();

            const { user: apiUser } = resJson;

            setUser(apiUser);
        }

        fetchUser();
    }, [token]);
    
    return (
        <AuthContext.Provider value={{ user }}>
            { children }
        </AuthContext.Provider>
    )
}