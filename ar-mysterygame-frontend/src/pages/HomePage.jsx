import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import gameServer from "../network/gameServer";

import "./home/HomePage.css";

import RegisterModal from "./home/RegisterModal";
import HomeButton from "./common/HomeButton";

import naritalkIcon from "../assets/icons/naritalk-icon.webp";
import couponIcon from "../assets/icons/coupon-icon.webp";
import gameinfoIcon from "../assets/icons/gameinfo-icon.webp";
import AppArea from "./common/AppArea";

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
            gameUser ? <HomeMenuView userInfo={gameUser} setGameUser={setGameUser}/> : <Loading />
        }
        </>
    );
}

const Loading = () => {
    return (<div>Loading...</div>);
}

const HomeMenuView = (props) => {
    const gameUser = props.userInfo;
    const navigate = useNavigate();

    const applist = [
        {id: "1", name: "naritalk", path: "/naritalk", img: naritalkIcon},
        {id: "3", name: "クーポン", path: "/coupon", img: couponIcon},
        {id: "5", name: "ゲーム情報", path: "/gameinfo", img: gameinfoIcon}
    ];

    if (gameUser.role === "UNREGISTER_USER") {
        return (<RegisterModal setGameUser={(props.setGameUser)} />)
    }

    return (
        <>
        <AppArea>
            <div id="homemenu">
            {
                applist.map((item) => (
                    <div className="app-icon" key={item.id}>
                        <div onClick={() => navigate(item.path)}>
                            <img height="100%" width="100%" src={item.img} alt={item.name} ></img>
                        </div>
                        {item.name}
                    </div>
                ))
            }
        </div>
        </AppArea>
        <HomeButton />
        </>
    )
}

export default HomePage;