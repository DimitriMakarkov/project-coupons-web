import { jwtDecode } from "jwt-decode";
import { jwtData } from "../Components/Types/UserTypes";
import { Navigate, Outlet } from "react-router-dom";

export const PermissionGuard = ({ permission }: { permission: string }) => {
    let token = sessionStorage.getItem("jwt");
    
    if(token){
        let decodedToken:jwtData = jwtDecode(token);
        
        if(decodedToken.userType === permission){
            return <Outlet/>;
        }else{
            if(decodedToken.userType ==="ADMIN"){
                return <Navigate to="/ADMIN"/>;
            }else if(decodedToken.userType ==="COMPANY"){
                return <Navigate to="/COMPANY"/>;
            }else{
                return <Navigate to="/CUSTOMER"/>;
            }
        }
    }
    return <Navigate to="/"/>;
}
