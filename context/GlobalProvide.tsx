import { createContext, useContext, useState, useEffect, ReactNode, } from "react";
import { User, getCurrentUser } from "../lib/appwrite";

interface GlobalContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    user: User | null;
    setUser: (user: User | null) => void;
    isLoading: boolean;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);
export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
};

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCurrentUser().then(
            (currentUser) => {
                if (currentUser) {
                    setUser(currentUser);
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                    setUser(null);
                }
            }
        ).catch(
            (error: unknown) => {
                if (error instanceof Error) {
                    console.error("from context", error.message);
                } else {
                    console.error('An Unknown error occurred');
                }
            }
        ).finally(
            () => {
                setIsLoading(false);
            }
        );
    }, []);

    return (
        <GlobalContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            user,
            setUser,
            isLoading,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}