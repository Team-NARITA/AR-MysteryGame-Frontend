import {getRedirectResult, GoogleAuthProvider, signInWithRedirect} from "firebase/auth";
import { auth } from "../network/auth/firebase";
import {useEffect} from "react";
import {useNavigate} from "react-router";

import gameLogo from '../assets/main-visual.png';

const LoginPage = () => {
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const clickLogin = () => {
        signInWithRedirect(auth, provider);
    }

    useEffect(() => {
        getRedirectResult(auth)
            .then((result) => {
                if (result == null) return;
                console.log(result);
                navigate("/");
            }).catch((error) => {
                console.log(error);
            }
        )
    }, []);

    return (
        <div className="Homecontent" id="home">
            <img className="Fullsizeimg Littleopacity" src={gameLogo} alt="ロゴ"></img>
            <button className="Startbutton" onClick={() => clickLogin()}>ログインして開始</button>
        </div>
    );
}

export default LoginPage;