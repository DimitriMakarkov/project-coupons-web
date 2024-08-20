import { Company } from "../Components/Model/Company";
import { Coupon } from "../Components/Model/Coupon";
import { UserDetails } from "../Components/Model/UserDetails";

export class companyState {
    public allCompanyCoupons:Coupon[]=[];
    public companyInfo:Company[]=[];
    }

    export enum CompanyActionType {
        addCoupon = "addCoupon",
        updateCoupon = "updateCoupon",
        deleteCoupon = "deleteCoupon",
        getAllCompanyCoupons = "getAllCompanyCoupons",
        getAllCategoryCoupons = "getAllCategoryCoupons",
        getAllMaxPriceCoupons = "getAllMaxPriceCoupons",
        getCompanyInfo = "getCompanyInfo",
    }

    export interface CompanyAction {
        type: CompanyActionType,
        payload?: any
    }

    export function addCouponAction(newCoupon: Coupon): CompanyAction {
        return { type: CompanyActionType.addCoupon, payload: newCoupon };
    }

    export function updateCouponAction(coupon: Coupon): CompanyAction {
        return { type: CompanyActionType.updateCoupon, payload: coupon };
    }

    export function deleteCouponAction(id: string): CompanyAction {
        return { type: CompanyActionType.deleteCoupon, payload: id };
    }
    
    export function getAllCompanyCouponsAction(coupons: Coupon[]): CompanyAction {
        return { type: CompanyActionType.getAllCompanyCoupons, payload: coupons };
    }

    export function getAllCategoryCouponsAction(coupons: Coupon[]): CompanyAction {
        return { type: CompanyActionType.getAllCategoryCoupons, payload: coupons };
    }

    export function getAllMaxPriceCouponsAction(coupons: Coupon[]): CompanyAction {
        return { type: CompanyActionType.getAllMaxPriceCoupons, payload: coupons };
    }

    export function getCompanyInfoAction(company: UserDetails): CompanyAction {
        return { type: CompanyActionType.getCompanyInfo, payload: company };
    }
    
    export function CompanyReducer(currentState: companyState = new companyState(), action: CompanyAction): companyState {
        let newState = { ...currentState };

        switch (action.type) {
            case CompanyActionType.addCoupon:
                newState.allCompanyCoupons = [...newState.allCompanyCoupons,action.payload];
                break;

                case CompanyActionType.updateCoupon:
                    newState.allCompanyCoupons = [...newState.allCompanyCoupons].filter((item)=> item.id !== action.payload.id);
                    newState.allCompanyCoupons = [...newState.allCompanyCoupons, action.payload];
                    break;
                case CompanyActionType.deleteCoupon:
                    newState.allCompanyCoupons = [...newState.allCompanyCoupons].filter((item)=> item.id !== action.payload);
                    break; 

                case CompanyActionType.getAllCompanyCoupons:
                    newState.allCompanyCoupons = action.payload;
                    break;
                case CompanyActionType.getAllCategoryCoupons:
                    newState.allCompanyCoupons = action.payload;
                    break;

                case CompanyActionType.getAllMaxPriceCoupons:
                    newState.allCompanyCoupons = action.payload;
                    break;
                case CompanyActionType.getCompanyInfo:
                    newState.allCompanyCoupons = action.payload;
                    break;
        }
        return newState;
    }