import { useEffect, useState } from "react";
import AppArea from "./common/AppArea";
import Header from "./common/Header";
import HomeButton from "./common/HomeButton";
import gameServer from "../network/gameServer";

const GameInfoPage = () => {
    const [gameUser, setGameUser] = useState(null);
    
    useEffect(() => {
        gameServer.get("/v1/users/self", {}, (response) => {
            if (response == null) return;
            setGameUser(response.data);
        });
    }, []);

    return (
        <>
            <Header />
            <AppArea>
                { gameUser ? <GameInfoView gameUser={gameUser} /> : <></>}
            </AppArea>
            <HomeButton />
        </>
    )
}

const GameInfoView = (props) => {
    const userName = props.gameUser.userName;
    const currentChapter = props.gameUser.currentChapter;
    const clearedChapters = props.gameUser.clearedChapter;
    const solvedMysterys = props.gameUser.solvedMystery;
    const createAt = props.gameUser.createAt;

    const dateStr = new Date(createAt);

    return (
        <>
            <p>ユーザーネーム: {userName}</p>
            <p>現在のチャプター: {currentChapter.chapterName}</p>
            <p>クリアしたチャプター数: {clearedChapters.length}</p>
            <p>解いた謎の数: {solvedMysterys.length}</p>
            <p>アカウント作成日時: {dateStr.toLocaleString()}</p>
        </>
    )
}

export default GameInfoPage;