import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {

    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

