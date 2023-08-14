import React, { Component } from "react";

class MemoInput extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <div className="Memoheader">テキスト入力</div>

                <textarea id="Memotext" cols={20} rows={30} placeholder="ここにテキストを入力"/>
                
                <div className="footer">
                    <div className="button-left"></div>
                    <div className="wrap">
                        <div className="button-area"></div>
                    </div>
                    <div className="button-right"></div>
                </div>
            </div>
        );
    }
}

export default MemoInput;