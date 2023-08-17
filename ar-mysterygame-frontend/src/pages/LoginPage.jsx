import {getRedirectResult, GoogleAuthProvider, signInWithRedirect} from "firebase/auth";
import { auth } from "../network/auth/firebase";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";

import "./login/LoginPage.css"
import gameLogo from '../assets/main-visual.png';

const LoginPage = () => {
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(sessionStorage.getItem("loading") ? true : false);
        getRedirectResult(auth)
            .then((result) => {
                sessionStorage.clear();
                setLoading(false);
                if (result == null) return;
                console.log(result);
            }).catch((error) => {
                console.log(error);
            }
        )
    }, []);

    return (
        <>
            {isLoading ? <div>Loading...</div>: <LoginView/>}
        </>
    );
}

const LoginView = () => {
    const provider = new GoogleAuthProvider();
    const clickLogin = () => {
        sessionStorage.setItem('loading','true');
        signInWithRedirect(auth, provider);
    }
    return (
        <div className="home-content">
            <img className="fullsize-img little-opacity" src={gameLogo} alt="ロゴ"></img>
            <button className="start-button" onClick={() => clickLogin()}>ログインして開始</button>
        </div>
    );
}

export default LoginPage;