import { useEffect, useState } from "react";
import "./GetCustomerInfo.css";
import { Customer } from "../../../Model/Customer";
import { checkData } from "../../../../Utility/checkData";
import axiosJWT from "../../../../Utility/axiosJWT";
import { store } from "../../../../Redux/store";
import { getCustomerInfoAction } from "../../../../Redux/customerReducer";
import { Typography } from "@mui/material";

export function GetCustomerInfo(): JSX.Element {

    const [customer, setCustomer] = useState<Customer>();

    useEffect(() => {
        checkData();
        let customer = localStorage.getItem("loggedUser");
        if (customer) {
            let customerData = JSON.parse(customer);
            axiosJWT.get(`http://localhost:8080/customer/getCustomerInfo/${customerData.id}`).then(res => {
                setCustomer(res.data);
                store.dispatch(getCustomerInfoAction(res.data));
            })

                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [])

    return (
        <div className="GetCustomerInfo">
            {customer && (
                <div>
                    <div className="Box">
                        <div className="CompanyDetails">
                            <Typography variant="h6">Company Details:</Typography>
                            <Typography>First Name: {customer.firstName}</Typography>
                            <Typography>Last Name: {customer.lastName}</Typography>
                            <Typography>Email: {customer.email}</Typography>
                            <Typography>Company ID: {customer.id}</Typography>
                        </div>
                    </div>
                    <div className="CouponsList">
                        {customer.coupons.map(coupon => (
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
