import axios from "axios";
import { Company } from "../Components/Model/Company";
import axiosJWT from "../Utility/axiosJWT";

export class CompanyService{

    private static instance: CompanyService;

    private constructor(){}

    public static getInstance(): CompanyService{
        if(!CompanyService.instance){
            CompanyService.instance = new CompanyService();
        }
        return CompanyService.instance;
    }
getCompany = async (data:any):Promise<Company>=>{
    let res = await axiosJWT.get("http://localhost:8080/company/getCompanyInfo",data)
    return res.data;
    }
}