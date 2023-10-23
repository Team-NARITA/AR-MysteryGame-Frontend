import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import gameServer from "../../network/gameServer";
import Header from "../common/Header";
import AppArea from "../common/AppArea";
import HomeButton from "../common/HomeButton";

import "./CouponUsePage.css";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { CouponUseDialog } from "./CouponUseDialog";
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
                { userCouponData && <CouponView userCouponData={userCouponData} couponId={couponId} /> }
            </AppArea>
            <HomeButton style={colorStyle}/>
        </>
    );
}

const CouponView = (props) => {
    const navigate = useNavigate();
    const [modalConfig, setModalConfig] = useState();
    const couponId = props.couponId;
    const userCouponData = props.userCouponData;
    const couponData = userCouponData.couponData;
    const style = userCouponData.isAvailable ? availableColorStyle : notAvailableColorStyle;

    const useCoupon = async () => {
        const ret = await new Promise((resolve) => {
            setModalConfig({
                onClose: resolve,
                title: "クーポンを使用します",
                message: "使用する前に店員にクーポンを提示してください"
            })
        })
        setModalConfig(undefined);
        console.log(ret);
        if (ret === "ok") {
            gameServer.get("/v1/coupon/use/"+couponId, {}, (usedCoupon) => {
                navigate(-1);
            })
        }
    }

    return (
        <div className="coupon-card-wrapper">
            <div className="coupon-card" css={style.card}>
                <figure className="coupon-card-thumbnail">
                    <img src={couponData.thumbnail} alt={couponData.discountItem} className="coupon-card-image"/>
                </figure>
                <div className="coupon-card-body">
                    <p className="coupon-card-storeName">{couponData.storeName}</p>
                    <p className="coupon-card-discountItem">{couponData.discountItem}</p>
                    <p className="coupon-card-storePlace">{couponData.storePlace}</p>
                    <div className="coupon-card-prices">
                        <p className="coupon-card-originPrice">{couponData.originalPrice}円</p>
                        <p className="coupon-card-discountedPrice">{couponData.discountedPrice}円</p>
                    </div>
                </div>
            </div>
            <div style={{textAlign: "center", marginTop: "10px"}}>
                { userCouponData.isAvailable ? <button className="coupon-use-button" css={style.card} onClick={() => useCoupon()}>使用する</button> : <button className="coupon-use-button" css={style.card} disabled={true}>使用不可</button>}
            </div>
            { modalConfig && <CouponUseDialog {...modalConfig} /> }
        </div>
    );
}

export default CouponUsePage;