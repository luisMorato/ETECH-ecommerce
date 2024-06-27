import { 
    createContext, 
    Dispatch, 
    SetStateAction, 
    useState
} from "react";

type searchContextProps = {
    search: string,
    setSearch: Dispatch<SetStateAction<string>>,
}

//Create a Context For the Search Modal
export const SearchContext = createContext<searchContextProps>({
    search: '',
    setSearch: () => void 0
});

//Create a Provider For the Context of the Search Modal
export const SearchContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [search, setSearch] = useState<string>('');

    return (
        <SearchContext.Provider value={{ search, setSearch }}>
            {children}
        </SearchContext.Provider>
    );
}