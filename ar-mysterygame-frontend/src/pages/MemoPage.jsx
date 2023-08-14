import React, { Component } from "react";
import MemoView from "./Memo/MemoView";
import "../pages/Memo/MemoPage.css"
import MemoInput from "./Memo/MemoInput";

const MemoPage = () => {
    return (
        <div>
            <div className="Memolist">メモ一覧</div>
            
            <MemoView />
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

export default MemoPage;