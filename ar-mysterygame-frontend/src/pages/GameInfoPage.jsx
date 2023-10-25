import { useEffect, useState } from "react";
import AppArea from "./common/AppArea";
import Header from "./common/Header";
import HomeButton from "./common/HomeButton";
import gameServer from "../network/gameServer";

import "./gameinfo/GameInfoPage.css";

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
                { gameUser && <GameInfoView gameUser={gameUser} /> }
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
        <div className="gameinfo">
            <div className="wrapper">
                <div className="username">
                    <p className="caption">ユーザーネーム: </p>
                    <p className="name">{userName}</p>
                </div>
                <div className="progress">
                    <p className="caption">現在の進捗状況</p>
                    <p className="now-chapter">現在の進捗: {currentChapter.chapterName}</p>
                    <p className="solvedmystery">解いた謎の合計数: {solvedMysterys.length}</p>
                    <p>アカウント作成日時:</p>
                    <p className="date">{dateStr.toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
}

export default GameInfoPage;