import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";
function PrivateRoutes() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
   
    return (
        <>
            {isAuthenticated ? (<Outlet />) : (<Navigate to="/auth/login" />)}
        </>
    );
}

export default PrivateRoutes;