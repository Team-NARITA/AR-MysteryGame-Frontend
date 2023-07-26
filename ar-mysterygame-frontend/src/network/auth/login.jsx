import React from 'react'
import ReactDOM from 'react-dom/client'
import { auth } from "./firebase"
import { signInWithRedirect, GoogleAuthProvider, getRedirectResult } from "firebase/auth";
import { useEffect } from "react";
import Load from '../../Load';

const Login = () => {
    const provider = new GoogleAuthProvider();

    const clickLogin = () => {
        sessionStorage.setItem('loading','true')
        signInWithRedirect(auth, provider);
    }

    useEffect(() => {

        const loading = sessionStorage.getItem('loading');
        if(loading == 'true') {
            ReactDOM.createRoot(document.getElementById('home')).render(
                <Load></Load>
            )
        }

        getRedirectResult(auth)
        .then((result) => {
            const credental = GoogleAuthProvider.credentialFromResult(result);
            localStorage.setItem('armysteryid',credental.accessToken);
            localStorage.setItem('armysteryaccess',credental.idToken);
            window.location.reload();
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])

    return (
        <button className="Startbutton" onClick={() => clickLogin()}>ログインして開始</button>
    )
}

export default Login;