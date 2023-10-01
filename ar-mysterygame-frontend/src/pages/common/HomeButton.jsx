import { Link } from "react-router-dom";
import "./HomeButton.css";

import CircleIcon from '@mui/icons-material/Circle';

const HomeButton = () => {
    return (
        <div className="footer">
            <div className="button-left"></div>
            <div className="wrap">
                <div className="button-area">
                    <Link to={"/"}>
                        <CircleIcon style={{height:"100%", width:"100%", color:"#ddd"}}/>
                    </Link>
                </div>
            </div>
            <div className="button-right"></div>
        </div>
    );
}

export default HomeButton;