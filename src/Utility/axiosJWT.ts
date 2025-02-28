import axios from "axios";
import { store } from "../Redux/store"
import { loginAction, updateTokenAction } from "../Redux/authReducer";

const axiosJWT = axios.create();

axiosJWT.interceptors.request.use(
    request=>{
        request.headers.Authorization = `${store.getState().auth.token}`;
        return request;
    }
)

axiosJWT.interceptors.response.use(
    response=>{
        console.log(response.headers.authorization);
        store.dispatch(updateTokenAction(response.headers.authorization));      
        sessionStorage.setItem("jwt",response.headers.authorization); 
        return response;
    }
)

export default axiosJWT;