
import mainvisual from '../assets/main-visual.png'
import Login from '../network/auth/login'
import { useEffect } from 'react';
import React from 'react';
import registerPath from '../network/registerPath';
import axios from 'axios';
import Register from './Register';
import { createContext } from 'react';

export const username = createContext();

function Home() {

    const [result, setResult] = React.useState();
    const [UserName, setUserName] = React.useState();

    function handleChange(event) {
        setUserName(event.target.value);
    }
    useEffect(() => {
        const path = registerPath("/register");
        async function connection() {
            setResult((await axios.get(path)).data);
        }
        connection();
    }, []);
    const AccessKey = localStorage.getItem('armysteryaccess');
    const IdKey = localStorage.getItem('armysteryid');
    if(!AccessKey) {
        return (
            <div className='Homecontent' id='home'>
                <img className="Fullsizeimg Littleopacity" src={mainvisual} alt="メイン画像"></img>
                <Login></Login>
            </div>
        );
    } else {
        return (
            <div className='Homecontent' id='home'>
                <username.Provider value={UserName}>
                    <img className="Fullsizeimg Littleopacity" src={mainvisual} alt="メイン画像"></img>
                    <div className='Inputbox'>
                        <h1>ニックネームを決めてください</h1>
                        <input type='text' className='Usernamebox' placeholder="ニックネーム" onChange={handleChange}></input>
                        <Register></Register>
                    </div>
                </username.Provider>
            </div>
        );
    }
}

export default Home