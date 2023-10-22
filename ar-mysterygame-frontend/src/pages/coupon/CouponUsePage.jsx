import { useEffect, useState } from "react";
import { useParams } from "react-router"
import gameServer from "../../network/gameServer";
import Header from "../common/Header";
import AppArea from "../common/AppArea";
import HomeButton from "../common/HomeButton";

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
        gameServer.get("/v1/coupon/" + couponId, {}, (couponData) => {
            setUserCouponData(couponData.data);
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

    const useCoupon = () => {
    }

    return (
        <div className="coupon-wrapper" style={{width:"95vw", margin:"15px auto", maxWidth: "50vh"}}>
            <div className="coupon-card" style={{height:"65vh", borderRadius: "10px"}} css={style.card}>
                <img src={couponData.thumbnail} width="100%"  style={{borderRadius: "10px", aspectRatio: "16/9"}} />
                <div className="coupon-card-info" css={style.p}>
                    <p className="coupon-card-storeName">{couponData.storeName}</p>
                    <p className="coupon-card-discountItem">{couponData.discountItem}</p>
                    <p className="coupon-card-storePlace">{couponData.storePlace}</p>
                    <p className="coupon-card-originPrice">{couponData.originalPrice}円</p>
                    <p className="coupon-card-discountedPrice">{couponData.discountedPrice}円</p>
                </div>
            </div>
            <div style={{textAlign: "center", marginTop: "10px"}}>
                { userCouponData.isAvailable ? <button className="coupon-use-button" css={style.card} onClick={() => useCoupon()}>使用する</button> : <button className="coupon-use-button" css={style.card} disabled={true}>使用不可</button>}
            </div>
        </div>
    )
}

export default CouponUsePage;