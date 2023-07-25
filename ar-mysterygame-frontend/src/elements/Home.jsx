
import mainvisual from '../assets/main-visual.png'
import Login from '../network/auth/login'

function Home() {
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
                <img className="Fullsizeimg Littleopacity" src={mainvisual} alt="メイン画像"></img>
                <div className='Inputbox'>
                    <h1>ニックネームを決めてください</h1>
                    <input type='text' className='Usernamebox' placeholder="ニックネーム"></input>
                    <button className='Submitbutton'>登録する！</button>
                </div>
            </div>
        );
    }
}

export default Home