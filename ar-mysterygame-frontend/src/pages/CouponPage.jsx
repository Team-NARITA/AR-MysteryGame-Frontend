import { useEffect, useState } from "react";
import AppArea from "./common/AppArea";
import Header from "./common/Header";
import HomeButton from "./common/HomeButton";
import gameServer from "../network/gameServer";

import "./coupon/CouponPage.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate } from "react-router";
const colorStyle = css`
    background-color: #d54f7a !important
`;

const CouponPage = () => {
    const [couponList, setCouponList] = useState();
    useEffect(() => {
        gameServer.get("/v1/coupon/", {}, (couponData) => {
            setCouponList(couponData.data);
        })
    }, []);
    return (
        <>
            <Header style={colorStyle}/>
            <AppArea>
                <CouponListView couponList={couponList} />
            </AppArea>
            <HomeButton style={colorStyle}/>
        </>
    );
}

const CouponListView = (props) => {
    const couponList = props.couponList;
    if (couponList == null) return <></>;
    return (
        <div className="coupon-list-wrapper">
            {
                couponList.map(userCouponData => 
                    <CouponItem key={userCouponData.couponData.couponId} userCouponData={userCouponData} />
                )
            }
        </div>
    )
}

const availableColorStyle = {
    couponitem: css`
        background-color: #f784ae;
    `,
    triangle: css`
        background-color: #d54f7a;
    `,
    p: css`
        color: #000000;
    `
};

const notAvailableColorStyle = {
    couponitem: css`
        background-color: #5c5c5c;
    `,
    triangle: css`
        background-color: #5c5c5c;
    `,
    p: css`
        color: #ffffff;
    `
};

const CouponItem = (props) => {
    const navigate = useNavigate();
    const userCouponData = props.userCouponData;
    const couponData = userCouponData.couponData;
    const style = userCouponData.isAvailable ? availableColorStyle : notAvailableColorStyle;
    return (
        <div className="coupon-item-wrapper">
            <div className="coupon-item" onClick={() => navigate("./" + couponData.couponId)} css={style.couponitem}>
                <p className="coupon-name" css={style.p}>{couponData.couponName}</p>
                <p className="coupon-info" css={style.p}>{couponData.storeName}:{couponData.storePlace}</p>
                <ArrowForwardIosIcon className="arrow-icon" css={style.p}/>
            </div>
            <div className="triangle" css={style.triangle}></div>
        </div>
    )
}

export default CouponPage;