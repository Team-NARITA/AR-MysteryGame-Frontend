
import mainvisual from '../assets/main-visual.png'
import '../App.css'
import Login from '../network/auth/login'

function Home() {
    return (
        <div className='Homecontent'>
            <img className="Fullsizeimg Littleopacity" src={mainvisual} alt="メイン画像"></img>
            <Login></Login>
        </div>
    );
}

export default Home