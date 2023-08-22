import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import gameServer from "../network/gameServer";

import "./home/HomePage.css";

import { ReactSortable } from "react-sortablejs";
import RegisterModal from "./home/RegisterModal";
import HomeButton from "./common/HomeButton";

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
    if (gameUser.role === "UNREGISTER_USER") {
        return (<RegisterModal setGameUser={(props.setGameUser)} />)
    }

    const [ applist, setApplist ] = useState([
        {id: "1", name: "naritalk", path: "/naritalk"},
        {id: "2", name: "naritter"},
        {id: "3", name: "クーポン"},
        {id: "4", name: "メモ"},
        {id: "5", name: "ゲーム情報"},
        {id: "6", name: "ARアプリ"},
    ])

    return (
        <ReactSortable list={applist} setList={setApplist} delay={400} id="homemenu">
            {
                applist.map((item) => (
                    <div key={item.id} className="app-icon" onClick={() => navigate(item.path)}>
                        {item.name}
                    </div>
                ))
            }
        </ReactSortable>
    )
}

export default HomePage;