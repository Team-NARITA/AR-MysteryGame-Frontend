import { auth } from "./firebase"
import { signInWithRedirect, GoogleAuthProvider, getRedirectResult } from "firebase/auth";
import { useEffect } from "react";

const Login = () => {
    const provider = new GoogleAuthProvider();

    const clickLogin = () => {
        signInWithRedirect(auth, provider);
    }

    useEffect(() => {
        getRedirectResult(auth)
        .then((result) => {
            const credental = GoogleAuthProvider.credentialFromResult(result);
            console.log(credental);
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])

    return (
        <button className="Startbutton" onClick={() => clickLogin()}>ゲームをはじめる</button>
    )
}

export default Login;