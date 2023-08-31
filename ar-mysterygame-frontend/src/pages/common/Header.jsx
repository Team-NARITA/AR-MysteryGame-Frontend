import "./Header.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Header = (props) => {
    const imgSrc = props.imgSrc;
    const prev = props.prev;

    return (
        <div className="header">
            {prev ? <ArrowBackIosIcon className="prev-button" onClick={() => prev(-1)} /> : <></>}
            {imgSrc ? <img src={imgSrc} /> : <></>}
        </div>
    );
}

export default Header;