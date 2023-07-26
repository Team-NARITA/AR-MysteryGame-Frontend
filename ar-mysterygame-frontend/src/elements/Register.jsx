
import { useContext } from "react";
import { username } from "./Home";

function registerAccount() {

    const value = useContext(username);

    function register() {
        console.log("posted");
    }
    
    return (
        <button className='Submitbutton' onClick={register}>登録する！</button>
    )
}

export default registerAccount;