import { useState } from "react";
import { useForm } from "react-hook-form";
import gameServer from "../../network/gameServer";

import mainvisual from '../../assets/main-visual.png';

const RegisterModal = ( props ) => {
    const setGameUser = props.setGameUser;

    const registerAccount = ( username ) => {
        gameServer.post("/v1/users/register", {
            "username": username
        }, (response) => {
            setGameUser(response.data);
        })
    }

    return (
        <div className="modal">
            <img className="fullsize-img little-opacity" src={mainvisual} alt="メイン画像"></img>
            <InputArea registerAccount={registerAccount}/>
        </div>
    );
}

const InputArea = (( props ) => {
    const registerAccount = props.registerAccount;
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        registerAccount(data.username);
    }
    
    return (
        <form className="input-box" onSubmit={handleSubmit(onSubmit)}>
            <h2>ニックネームを決めてください</h2>
            <input type="text" className="username-box" placeholder="ニックネーム" {...register("username", {required: true, minLength:3, maxLength: 20})}></input>
            <input type="submit" value="登録する!" className="submit-button"></input>
        </form>
    )
});

export default RegisterModal;