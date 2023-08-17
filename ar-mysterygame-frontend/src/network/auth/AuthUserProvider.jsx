import React, { useEffect } from "react";
import { auth } from "./firebase";
import { useNavigate } from "react-router";

const AuthUserContext = React.createContext(null);

export const useAuthUserContext = () => {
    return React.useContext(AuthUserContext);
}

export const AuthUserProvider = (props) => {
    const [authUser, setAuthUser] = React.useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const authStateChange = auth.onAuthStateChanged((user) => {
            if (user) {
                setAuthUser(user);
                navigate("/");
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