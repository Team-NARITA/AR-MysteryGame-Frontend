import "./AppArea.css";

const AppArea = (props) => {
    return (
        <div id="app-area">
            {props.children}
        </div>
    )
}

export default AppArea;