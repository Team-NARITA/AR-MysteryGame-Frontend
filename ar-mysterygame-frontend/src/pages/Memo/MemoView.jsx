import React, { Component } from "react";

class MemoView extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="Memobox">
                <div className="Memocontent">あああああああああああああああああああああああああああああああああああああああああああああああああああああああああ</div>
                <div className="Memobutton_area">
                    <div className="Deletebutton">✘</div>
                    <div className="Inputtrans">＞</div>
                </div>
            </div>
        );
    }
}

export default MemoView;