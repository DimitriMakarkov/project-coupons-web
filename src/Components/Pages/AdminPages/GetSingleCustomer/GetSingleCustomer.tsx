import { TextField, Button, Typography } from "@mui/material";
import "./GetSingleCustomer.css";
import { useState } from "react";
import { checkData } from "../../../../Utility/checkData";
import { store } from "../../../../Redux/store";
import { Customer } from "../../../Model/Customer";
import axiosJWT from "../../../../Utility/axiosJWT";
import { getSingleCustomerAction } from "../../../../Redux/adminReducer";

export function GetSingleCustomer(): JSX.Element {


    const [customer, setCustomer] = useState<Customer>();
    const [customerId, setCustomerId] = useState<number>();

    const getCustomerData = (id: number) => {
        checkData();
        if (store.getState().admin.allCustomers.length == 0) {
            console.log(store.getState().admin.allCustomers);
            axiosJWT.get(`http://localhost:8080/admin/getSingleCustomer/${id}`).then(res => {
                setCustomer(res.data);
                store.dispatch(getSingleCustomerAction(res.data));
            })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }
    return (
        <div className="GetSingleCustomer">
            <TextField
                label="Enter Customer ID"
                variant="outlined"
                type="number"
                onChange={(e) => setCustomerId(Number(e.target.value))}
            />
            <br />
            <Button
                variant="contained"
                color="primary"
                onClick={() => getCustomerData(customerId!)}
            >
                Get Company Data
            </Button>
            {customer && (
                <div>
                    <div className="Box">
                        <div className="customerDetails">
                            <Typography variant="h6">Customer Details:</Typography>
                            <Typography>First Name: {customer.firstName}</Typography>
                            <Typography>Last Name: {customer.lastName}</Typography>
                            <Typography>Email: {customer.email}</Typography>
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
