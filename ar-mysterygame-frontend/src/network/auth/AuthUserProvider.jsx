import React, { useEffect } from "react";
import { auth } from "./firebase";

const AuthUserContext = React.createContext(null);

export const useAuthUserContext = () => {
    return React.useContext(AuthUserContext);
}

export const AuthUserProvider = (props) => {
    const [authUser, setAuthUser] = React.useState(null);

    useEffect(() => {
        const authStateChange = auth.onAuthStateChanged((user) => {
            if (user) {
                setAuthUser(user);
            }
        });
        return () => {
            authStateChange();
        }
    },[]);

    return (
        <AuthUserContext.Provider value={authUser}>
            {props.children}
        </AuthUserContext.Provider>
    )
}