import "./Header.css"

const Header = (props) => {
    const imgSrc = props.imgSrc;
    return (
        <div className="header">
            {imgSrc ? <img src={imgSrc} /> : <></>}
        </div>
    );
}

export default Header;