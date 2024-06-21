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

export const SearchContext = createContext<searchContextProps>({
    search: '',
    setSearch: () => void 0
});

export const SearchContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [search, setSearch] = useState<string>('');

    return (
        <SearchContext.Provider value={{ search, setSearch }}>
            {children}
        </SearchContext.Provider>
    );
}