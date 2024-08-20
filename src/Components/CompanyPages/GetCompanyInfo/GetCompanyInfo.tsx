import { useEffect, useState } from "react";
import axiosJWT from "../../../Utility/axiosJWT";
import { checkData } from "../../../Utility/checkData";
import "./GetCompanyInfo.css";
import { Company } from "../../Model/Company";
import { store } from "../../../Redux/store";
import { getCompanyInfoAction } from "../../../Redux/companyReducer";
import { Typography } from "@mui/material";

export function GetCompanyInfo(): JSX.Element {

    const [company, setCompany] = useState<Company>();

    useEffect(() => {
        checkData();
        let company = localStorage.getItem("loggedUser");
        if (company) {
            let companyData = JSON.parse(company);
            axiosJWT.get(`http://localhost:8080/company/getCompanyInfo/${companyData.id}`).then(res => {
                setCompany(res.data);
                store.dispatch(getCompanyInfoAction(res.data));
            })

                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [])

    return (
        <div className="GetCompanyInfo">
            {company && (
                <div>
                    <div className="Box">
                        <div className="CompanyDetails">
                            <Typography variant="h6">Company Details:</Typography>
                            <Typography>Name: {company.name}</Typography>
                            <Typography>Email: {company.email}</Typography>
                            <Typography>Company ID: {company.id}</Typography>
                        </div>
                    </div>
                    <div className="CouponsList">
                        {company.coupons.map(coupon => (
                            <div key={coupon.id} className="CouponBox Box">
                                <Typography>Title: {coupon.title}</Typography>
                                <Typography>Description: {coupon.description}</Typography>
                                <Typography>Start Date: {coupon.start_date}</Typography>
                                <Typography>End Date: {coupon.end_date}</Typography>
                                <Typography>Amount: {coupon.amount}</Typography>
                                <Typography>Price: {coupon.price}</Typography>
                                <Typography>Coupon ID: {coupon.id}</Typography>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
