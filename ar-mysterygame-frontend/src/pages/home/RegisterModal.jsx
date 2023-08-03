import { useState } from "react";
import gameServer from "../../network/gameServer";

import mainvisual from '../../assets/main-visual.png';

const RegisterModal = ( props ) => {
    const setGameUser = props.setGameUser;

    const register = ( username ) => {
        gameServer.post("/v1/users/register", {
            "username": username
        }, (response) => {
            setGameUser(response.data);
        })
    }

    return (
        <div className="modal">
            <img className="fullsize-img little-opacity" src={mainvisual} alt="メイン画像"></img>
            <InputArea register={register}/>
        </div>
    );
}

const InputArea = (( props ) => {
    const register = props.register;
    const [username, setUsername] = useState("");

    const handleChange = (event) => {
        setUsername(event.target.value);
    }

    const handleClick = () => {
        register(username);
    }
    
    return (
        <div className="input-box">
            <h1>ニックネームを決めてください</h1>
            <input type="text" className="username-box" placeholder="ニックネーム" onChange={handleChange}></input>
            <button className="submit-button" onClick={handleClick}>登録する!</button>
        </div>
    )
});

export default RegisterModal;