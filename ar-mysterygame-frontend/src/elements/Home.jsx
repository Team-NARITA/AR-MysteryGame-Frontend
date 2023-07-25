
import mainvisual from '../assets/main-visual.png'
import '../App.css'

function Home() {
    return (
        <div className='Homecontent'>
            <img className="Fullsizeimg Littleopacity" src={mainvisual} alt="メイン画像"></img>
            <button className="Startbutton">ゲームをはじめる</button>
        </div>
    );
}

export default Home