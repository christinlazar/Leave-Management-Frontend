import { Navigate,Outlet } from "react-router-dom";
import {  useSelector } from "react-redux";

const UserLoggedIn = () =>{
    const userInfo = useSelector((state)=>state.auth)
    return (
        userInfo.userInfo ? <Outlet/> : <Navigate to='/'/>
    )
}

export default UserLoggedIn