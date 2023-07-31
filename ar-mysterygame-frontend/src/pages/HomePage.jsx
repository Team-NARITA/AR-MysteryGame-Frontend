import { useEffect, useState } from "react";
import gameServer from "../network/gameServer";

const HomePage = () => {
    const [gameUser, setGameUser] = useState(null);

    useEffect(() => {
        gameServer.get("/v1/users/self", {userId: gameServer.getUserId()}, (response) => {
            if (response == null) return
            setGameUser(response.data);
        });
    }, []);

    return (
        <>
            <h2>ログイン完了</h2>
            <UserInfoView userInfo={gameUser} />
        </>
    );
}

const UserInfoView = (props) => {
    const gameUser = props.userInfo;

    if (gameUser == null) {
        return <></>;
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