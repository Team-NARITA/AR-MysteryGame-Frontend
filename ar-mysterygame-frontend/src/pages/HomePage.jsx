import { useEffect, useState } from "react";
import gameServer from "../network/gameServer";

import "./home/HomePage.css"
import RegisterModal from "./home/RegisterModal";

const HomePage = () => {
    const [gameUser, setGameUser] = useState(null);

    useEffect(() => {
        gameServer.get("/v1/users/self", {}, (response) => {
            if (response == null) return
            setGameUser(response.data);
        });
    }, []);

    return (
        <>
        {
            gameUser ? <UserInfoView userInfo={gameUser} setGameUser={setGameUser}/> : <Loading />
        }
        </>
    );
}

const Loading = () => {
    return (<div>Loading...</div>);
}

const UserInfoView = (props) => {
    const gameUser = props.userInfo;

    if (gameUser.role == "UNREGISTER_USER") {
        return (<RegisterModal setGameUser={props.setGameUser}/>);
    }

    return (
        <>
            <p>userId: {gameUser.userId}</p>
            <p>userName: {gameUser.userName}</p>
            <p>role: {gameUser.role}</p>
            <p>createAt: {gameUser.createAt}</p>
        </>
    );
}

export default HomePage;