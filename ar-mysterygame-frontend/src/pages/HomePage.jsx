import { useEffect, useState } from "react";
import gameServer from "../network/gameServer";

const HomePage = () => {
    const [gameUser, setGameUser] = useState();

    useEffect(() => {
        gameServer.get("/v1/users/hello", {userId: gameServer.getUserId()}, (response) => setGameUser(response.data));
    }, []);

    return (
        <>
            <h2>ログイン完了</h2>
            <p>userId: {gameUser.userId}</p>
            <p>userName: {gameUser.userName}</p>
            <p>role: {gameUser.role}</p>
            <p>createAt: {gameUser.createAt}</p>
        </>
    );
}

export default HomePage;