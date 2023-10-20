import { useEffect, useState } from "react";
import { useParams } from "react-router"
import gameServer from "../../network/gameServer";
import Header from "../common/Header";
import AppArea from "../common/AppArea";
import HomeButton from "../common/HomeButton";

import { css } from "@emotion/react";
const colorStyle = css`
    background-color: #d54f7a !important
`;

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
    console.log(couponData)

    return (
        <div className="coupon-wrapper">
            <div className="coupon-card">

            </div>
        </div>
    )
}

export default CouponUsePage;