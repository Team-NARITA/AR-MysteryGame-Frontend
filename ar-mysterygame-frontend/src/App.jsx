import {useState, useEffect} from "react";
import {Route, Routes, useNavigate} from "react-router";

import { auth } from "./network/auth/firebase";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

import "./App.css"

function App() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const authStateChange = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                console.log("login!!");
            } else {
                console.log("test");
                navigate("/login");
            }
        });
        return () => {
            authStateChange();
        }
    },[]);

    const RequireAuth = ( props ) => {
        if (user != null) {
            return props.component;
        }
        navigate("/login");
    }

    const RequireNoAuth = ( props ) => {
        if (user == null) {
            return props.component;
        }
        navigate("/");
    }

    return (
        <div className="App">
            <Routes>
                <Route path="/login" element={<RequireNoAuth component={<LoginPage />} />} />
                <Route path="/" element={<RequireAuth component={<HomePage />} />} />
            </Routes>
        </div>
    );
}

export default App
