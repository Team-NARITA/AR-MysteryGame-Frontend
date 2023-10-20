import { Link } from "react-router-dom";

/** @jsxImportSource @emotion/react */
import "./HomeButton.css";
import CircleIcon from '@mui/icons-material/Circle';

const HomeButton = (props) => {
    const style = props.style;
    return (
        <div className="footer" css={style}>
            <div className="button-left-wrap">
                <div className="button-left" css={style}></div>
            </div>
            <div className="wrap">
                <div className="button-area">
                    <Link to={"/"}>
                        <CircleIcon style={{height:"100%", width:"100%", color:"#ddd"}}/>
                    </Link>
                </div>
            </div>
            <div className="button-right-wrap">
                <div className="button-right" css={style}></div>
            </div>
        </div>
    );
}

export default HomeButton;