import axios from "axios";
import { UserDetails } from "../Components/Model/UserDetails";
import { SignInProps } from "../Components/Types/LoginTypes";
import axiosJWT from "../Utility/axiosJWT";
import { CompanyReducer, getCompanyInfoAction } from "../Redux/companyReducer";
import { store } from "../Redux/store";

export class AuthService{

    private static instance: AuthService;

    private constructor(){}

    public static getInstance(): AuthService{
        if(!AuthService.instance){
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }


    login = async (user:SignInProps):Promise<UserDetails>=>{
        let res = await axiosJWT.post("http://localhost:8080/user/login",user)
        const loggedUser = res.data;
        localStorage.setItem("loggedUser",JSON.stringify(loggedUser));
        return res.data;
        }

    checkUser = ():boolean =>{
        const user = localStorage.getItem("loggedUser");
        if  (user){
            const userData = JSON.parse(user)
            if(Object.keys(userData).length>0){
                return true;
            }
        }
        return false;
    }

}