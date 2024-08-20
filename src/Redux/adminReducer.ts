import { Company } from "../Components/Model/Company"
import { Coupon } from "../Components/Model/Coupon";
import { Customer } from "../Components/Model/Customer";

export class adminState {
public allCompanies:Company[]=[];
public allCustomers:Customer[]=[];
public allCoupons:Coupon[]=[];
public allCategoryCoupons:Coupon[]=[];
}

export enum AdminActionType {
    addCompany = "addCompany",
    updateCompany = "updateCompany",
    deleteCompany = "deleteCompany",
    getAllCompanies = "getAllCompanies",
    getSingleCompany = "getSingleCompany",
    addCustomer = "addCustomer",
    updateCustomer = "updateCustomer",
    deleteCustomer = "deleteCustomer",
    getAllCustomers = "getAllCustomers",
    getSingleCustomer = "getSingleCustomer",
    getAllCategoryCoupons = "getAllCategoryCoupons",
}

export interface AdminAction {
    type: AdminActionType,
    payload?: any
}

export function addCompanyAction(newCompany: Company): AdminAction {
    return { type: AdminActionType.addCompany, payload: newCompany };
}

export function updateCompanyAction(company: Company): AdminAction {
    return { type: AdminActionType.updateCompany, payload: company };
}

export function deleteCompanyAction(id: string): AdminAction {
    return { type: AdminActionType.deleteCompany, payload: id };
}

export function getAllCompaniesAction(companies: Company[]): AdminAction {
    return { type: AdminActionType.getAllCompanies, payload: companies };
}

export function getSingleCompanyAction(company: Company): AdminAction {
    return { type: AdminActionType.getSingleCompany, payload: company };
}

export function addCustomerAction(newCustomer: Customer): AdminAction {
    return { type: AdminActionType.addCustomer, payload: newCustomer };
}

export function updateCustomerAction(customer: Customer): AdminAction {
    return { type: AdminActionType.updateCustomer, payload: customer };
}

export function deleteCustomerAction(id: string): AdminAction {
    return { type: AdminActionType.deleteCustomer, payload: id };
}

export function getAllCustomersAction(customers: Customer[]): AdminAction {
    return { type: AdminActionType.getAllCustomers, payload: customers };
}

export function getSingleCustomerAction(customer: Customer): AdminAction {
    return { type: AdminActionType.getSingleCustomer, payload: customer };
}

export function getAllCategoryCouponsAction(coupons: Coupon[]): AdminAction {
    return { type: AdminActionType.getAllCategoryCoupons, payload: coupons };
}

export function AdminReducer(currentState: adminState = new adminState(), action: AdminAction): adminState {
    let newState = { ...currentState };

    switch (action.type) {
        case AdminActionType.addCompany:
            newState.allCompanies = [...newState.allCompanies,action.payload];
            break;
        case AdminActionType.updateCompany:
            newState.allCompanies = [...newState.allCompanies].filter((item)=> item.id !== action.payload.id);
            newState.allCompanies = [...newState.allCompanies, action.payload];
            break;
        case AdminActionType.deleteCompany:
            newState.allCompanies = [...newState.allCompanies].filter((item)=> item.id !== action.payload);
            break;
        case AdminActionType.getAllCompanies:
                newState.allCompanies = action.payload;
                break;
        case AdminActionType.getSingleCompany:
            newState.allCompanies = action.payload;
            break;

        case AdminActionType.addCustomer:
            newState.allCompanies = [...newState.allCompanies,action.payload];
            break;

        case AdminActionType.updateCustomer:
            newState.allCompanies = [...newState.allCompanies].filter((item)=> item.id !== action.payload.id);
            newState.allCompanies = [...newState.allCompanies, action.payload];
            break;

        case AdminActionType.deleteCustomer:
            newState.allCompanies = [...newState.allCompanies].filter((item)=> item.id !== action.payload);
            break;

        case AdminActionType.getAllCustomers:
            newState.allCompanies = action.payload;
            break;
            
        case AdminActionType.getSingleCustomer:
            newState.allCompanies = action.payload;
            break;

        case AdminActionType.getAllCategoryCoupons:
            newState.allCompanies = action.payload;
            break;
    }


    return newState;
}