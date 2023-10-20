import { useNavigate } from "react-router";

/** @jsxImportSource @emotion/react */
import "./Header.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Header = (props) => {
    const navigate = useNavigate();
    const prev = props.prev;
    const imgSrc = props.imgSrc;
    const style = props.style;

    return (
        <div className="header" css={style}>
            {prev ? <ArrowBackIosIcon className="prev-button" onClick={() => navigate(-1)} /> : <></>}
            {imgSrc ? <img src={imgSrc} /> : <></>}
        </div>
    );
}

export default Header;