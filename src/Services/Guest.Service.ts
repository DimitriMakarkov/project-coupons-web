import axios from "axios";
import { Coupon } from "../Components/Model/Coupon";
import { Company } from "../Components/Model/Company";

export class GuestService {

    private static instance: GuestService;

    private constructor() { }

    public static getInstance(): GuestService {
        if (!GuestService.instance) {
            GuestService.instance = new GuestService();
        }
        return GuestService.instance;
    }
    getAllCoupons = async (): Promise<Coupon[]> => {
        let res = await axios.get("http://localhost:8080/user/getAllCoupons")
        return res.data;
    }

    getAllCompanies = async (): Promise<Company[]> => {
        let res = await axios.get("http://localhost:8080/user/getAllCompanies")
        return res.data;
    }
}

