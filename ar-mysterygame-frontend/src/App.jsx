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
            } else {
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
        return (<>ログインしてください</>);
    }

    const RequireNoAuth = ( props ) => {
        if (user == null) {
            return props.component;
        }
        return (<>既にログインしています</>);
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

export default App;
