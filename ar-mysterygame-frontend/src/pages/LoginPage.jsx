import {getRedirectResult, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { auth } from "../network/auth/firebase";
import {useEffect, useState} from "react";

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
        signInWithPopup(auth, provider);
    }
    return (
        <div className="home-content">
            <img className="fullsize-img" src={gameLogo} alt="ロゴ"></img>
            <p style={{textAlign:"center", fontSize:"18px"}}>本ゲームのプレイには<br/>Googleアカウントでのログインが必要です.</p>
            <button className="start-button" onClick={() => clickLogin()}>ログインして開始</button>
        </div>
    );
}

export default LoginPage;