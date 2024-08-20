import { Coupon } from "../Components/Model/Coupon";
import { Customer } from "../Components/Model/Customer";
import { UserDetails } from "../Components/Model/UserDetails";

export class customerState{
    public allCustomerCoupons:Coupon[]=[];
    public customerInfo:Customer[]=[];
}

export enum CustomerActionType {
    purchaseCoupon = "purchaseCoupon",
    getAllCustomerCoupons = "getAllCompanyCoupons",
    getAllCategoryCoupons = "getAllCategoryCoupons",
    getAllMaxPriceCoupons = "getAllMaxPriceCoupons",
    getCustomerInfo = "getCustomerInfo",
}

export interface CustomerAction {
    type: CustomerActionType,
    payload?: any
}

export function getAllCustomerCouponsAction(Customers: Customer[]): CustomerAction {
    return { type: CustomerActionType.getAllCustomerCoupons, payload: Customers };
}

export function getAllCustomerCategoryCouponsAction(Customers: Customer[]): CustomerAction {
    return { type: CustomerActionType.getAllCategoryCoupons, payload: Customers };
}

export function getAllCustomerMaxPriceCouponsAction(Customers: Customer[]): CustomerAction {
    return { type: CustomerActionType.getAllMaxPriceCoupons, payload: Customers };
}

export function getCustomerInfoAction(Customer: UserDetails): CustomerAction {
    return { type: CustomerActionType.getCustomerInfo, payload: Customer };
}

export function CustomerReducer(currentState: customerState = new customerState(), action: CustomerAction): customerState {
    let newState = { ...currentState };
    
    switch (action.type) {
        case CustomerActionType.getAllCustomerCoupons:
            newState.allCustomerCoupons = action.payload;
            break;
        case CustomerActionType.getAllCategoryCoupons:
            newState.allCustomerCoupons = action.payload;
            break;

        case CustomerActionType.getAllMaxPriceCoupons:
            newState.allCustomerCoupons = action.payload;
            break;
        case CustomerActionType.getCustomerInfo:
            newState.allCustomerCoupons = action.payload;
            break;
    }
    return newState;
}
