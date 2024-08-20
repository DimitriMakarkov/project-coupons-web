import { Route, Routes } from "react-router-dom";
import { Main } from "../../Layout/Main/Main";
import { Page404 } from "../../Pages/Page404/Page404";
import "./MainRoute.css";
import { AllCoupons } from "../../Pages/AllCoupons/AllCoupons";
import { CategoryCoupons } from "../../Pages/CategoryCoupons/CategoryCoupons";
import { Login } from "../../Pages/Login/Login";
import { Register } from "../../Pages/Register/Register";
import { AdminPage } from "../../Pages/AdminPages/AdminPage/AdminPage";
import { CompanyPage } from "../../Pages/CompanyPage/CompanyPage";
import { CustomerPage } from "../../Pages/CustomerPage/CustomerPage";
import { GetAllCompanies } from "../../Pages/AdminPages/GetAllCompanies/GetAllCompanies";
import { UpdateCompany } from "../../Pages/AdminPages/UpdateCompany/UpdateCompany";
import { GetSingleCompany } from "../../Pages/AdminPages/GetSingleCompany/GetSingleCompany";
import { AddCompany } from "../../Pages/AdminPages/AddCompany/AddCompany";
import { GetAllCustomers } from "../../Pages/AdminPages/GetAllCustomers/GetAllCustomers";
import { UpdateCustomer } from "../../Pages/AdminPages/UpdateCustomer/UpdateCustomer";
import { AddCustomer } from "../../Pages/AdminPages/AddCustomer/AddCustomer";
import { GetSingleCustomer } from "../../Pages/AdminPages/GetSingleCustomer/GetSingleCustomer";
import { AddCoupon } from "../../CompanyPages/AddCoupon/AddCoupon";
import { GetAllCompanyCoupons } from "../../CompanyPages/GetAllCompanyCoupons/GetAllCompanyCoupons";
import { GetAllMaxPriceCoupons } from "../../CompanyPages/GetAllMaxPriceCoupons/GetAllMaxPriceCoupons";
import { GetCompanyInfo } from "../../CompanyPages/GetCompanyInfo/GetCompanyInfo";
import { GetAllCategoryCoupons } from "../../Pages/AdminPages/GetAllCategoryCoupons/GetAllCategoryCoupons";
import { PermissionGuard } from "../../../Guard/PermissionGuard";
import { RoutePermissionEnum } from "../../../Enums/RoutePermission.enum";
import { GetAllCompanyCategoryCoupons } from "../../CompanyPages/GetAllCompanyCategoryCoupons/GetAllCompanyCategoryCoupons";
import { PurchaseCoupon } from "../../Pages/CustomerPages/PurchaseCoupon/PurchaseCoupon";
import { GetAllCustomerCoupons } from "../../Pages/CustomerPages/GetAllCustomerCoupons/GetAllCustomerCoupons";
import { GetAllCustomerCategoryCoupons } from "../../Pages/CustomerPages/GetAllCustomerCategoryCoupons/GetAllCustomerCategoryCoupons";
import { GetAllCustomerMaxPriceCoupons } from "../../Pages/CustomerPages/GetAllCustomerMaxPriceCoupons/GetAllCustomerMaxPriceCoupons";
import { GetCustomerInfo } from "../../Pages/CustomerPages/GetCustomerInfo/GetCustomerInfo";
import { UpdateCoupon } from "../../CompanyPages/UpdateCoupon/UpdateCoupon";
import { AllCompanies } from "../../Pages/AllCompanies/AllCompanies";

export function MainRoute(): JSX.Element {

    return (
        <div className="MainRoute">
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/coupons" element={<AllCoupons />} />
                <Route path="/companies" element={<AllCompanies />} />
                <Route path="/categoryCoupons/:id" element={<CategoryCoupons />} />

                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                <Route element={<PermissionGuard permission={RoutePermissionEnum.ADMIN} />}>
                    <Route path="/ADMIN" element={<AdminPage />} />
                    <Route path="/allCoupons" element={<AllCoupons />} />
                    <Route path="/categoryCoupons/:id" element={<CategoryCoupons />} />
                    <Route path="/addCompany" element={<AddCompany />} />
                    <Route path="/getAllCompanies" element={<GetAllCompanies />} />
                    <Route path="/getSingleCompany/:id" element={<GetSingleCompany />} />
                    <Route path="/updateCompany" element={<UpdateCompany />} />
                    <Route path="/addCustomer" element={<AddCustomer />} />
                    <Route path="/getAllCustomers" element={<GetAllCustomers />} />
                    <Route path="/updateCustomer" element={<UpdateCustomer />} />
                    <Route path="/getSingleCustomer/:id" element={<GetSingleCustomer />} />
                    <Route path="/getAllCategoryCoupons/:id" element={<GetAllCategoryCoupons />} />
                </Route>

                <Route element={<PermissionGuard permission={RoutePermissionEnum.COMPANY} />}>
                    <Route path="/COMPANY" element={<CompanyPage />} />
                    <Route path="/addCoupon" element={<AddCoupon />} />
                    <Route path="/updateCoupon" element={<UpdateCoupon />} />
                    <Route path="/getAllCompanyCoupons" element={<GetAllCompanyCoupons />} />
                    <Route path="/getAllCompanyCategoryCoupons" element={<GetAllCompanyCategoryCoupons />} />
                    <Route path="/getAllCompanyMaxPriceCoupons" element={<GetAllMaxPriceCoupons />} />
                    <Route path="/getCompanyInfo/:id" element={<GetCompanyInfo />} />
                </Route>

                <Route element={<PermissionGuard permission={RoutePermissionEnum.CUSTOMER} />}>
                    <Route path="/CUSTOMER" element={<CustomerPage />} />
                    <Route path="/purchaseCoupon" element={<PurchaseCoupon />} />
                    <Route path="/getAllCustomerCoupons" element={<GetAllCustomerCoupons />} />
                    <Route path="/getAllCustomerCategoryCoupons" element={<GetAllCustomerCategoryCoupons />} />
                    <Route path="/getAllCustomerMaxPriceCoupons" element={<GetAllCustomerMaxPriceCoupons />} />
                    <Route path="/getCustomerInfo/:id" element={<GetCustomerInfo />} />
                </Route>

                <Route path="*" element={<Page404 />} />
            </Routes>
        </div>
    );
}
