import { useEffect, useState } from "react";
import { useParams } from "react-router"
import gameServer from "../../network/gameServer";
import Header from "../common/Header";
import AppArea from "../common/AppArea";
import HomeButton from "../common/HomeButton";

import takoyaki from "../../assets/takoyaki.webp";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
const colorStyle = css`
    background-color: #d54f7a !important
`;

const availableColorStyle = {
    card: css`
        background-color: #f784ae;
    `,
    p: css`
        color: #000000;
    `
}

const notAvailableColorStyle = {
    card: css`
        background-color: #5c5c5c;
    `,
    p: css`
        color: #ffffff;
    `
}

const CouponUsePage = () => {
    const { couponId } = useParams();
    const [ userCouponData, setUserCouponData ] = useState();

    useEffect(() => {
        gameServer.get("/v1/coupon/", {}, (couponData) => {
            setUserCouponData(couponData.data[0]);
        });
    }, []);

    return (
        <>
            <Header prev={true} style={colorStyle}/>
            <AppArea>
                { userCouponData ? <CouponView userCouponData={userCouponData}/> : <></>}
            </AppArea>
            <HomeButton style={colorStyle}/>
        </>
    );
}

const CouponView = (props) => {
    const userCouponData = props.userCouponData;
    const couponData = userCouponData.couponData;
    const style = userCouponData.isAvailable ? availableColorStyle : notAvailableColorStyle;

    return (
        <div className="coupon-wrapper" style={{width:"95vw", margin:"15px auto"}}>
            <div className="coupon-card" style={{height:"68vh", borderRadius: "10px"}} css={style.card}>
                <img src={takoyaki} width="100%" style={{borderRadius: "10px"}} />
                <div css={style.p}>
                    <p className="coupon-card-storeName">{couponData.storeName}</p>
                    <p className="coupon-card-discountItem">{couponData.discountItem}</p>
                </div>
            </div>
            <div>
                
            </div>
        </div>
    )
}

export default CouponUsePage;