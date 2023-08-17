import { Navigate, useLocation } from "react-router";
import { useAuthUserContext } from "../../network/auth/AuthUserProvider"

export const RouteAuthGuard = (props) => {
    const authUser = useAuthUserContext();
    
    if (!authUser) return (<Navigate to={props.redirect} state={useLocation()} replace={false} />)

    return <>{props.component}</>
}