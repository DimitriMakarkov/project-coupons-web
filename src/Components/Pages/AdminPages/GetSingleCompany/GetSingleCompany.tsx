import { useEffect, useState } from "react";
import "./GetSingleCompany.css";
import axiosJWT from "../../../../Utility/axiosJWT";
import { Company } from "../../../Model/Company";
import { TextField, Button, Typography } from "@mui/material";
import { checkData } from "../../../../Utility/checkData";
import { store } from "../../../../Redux/store";
import { getSingleCompanyAction } from "../../../../Redux/adminReducer";

export function GetSingleCompany(): JSX.Element {

    const [company, setCompany] = useState<Company>();
    const [companyId, setCompanyId] = useState<number>();

    const getCompanyData = (id: number) => {
        checkData();
        if (store.getState().admin.allCompanies.length == 0) {
            console.log(store.getState().admin.allCompanies);
            axiosJWT.get(`http://localhost:8080/admin/getSingleCompany/${id}`).then(res => {
                setCompany(res.data);
                store.dispatch(getSingleCompanyAction(res.data));
            })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }

    return (
        <div className="GetSingleCompany">
            <TextField
                label="Enter Company ID"
                variant="outlined"
                type="number"
                onChange={(e) => setCompanyId(Number(e.target.value))}
            />
            <br />
            <Button
                variant="contained"
                color="primary"
                onClick={() => getCompanyData(companyId!)}
            >
                Get Company Data
            </Button>
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
