import { useState } from "react";
import "./GetAllCustomerCategoryCoupons.css";
import { Coupon } from "../../../Model/Coupon";
import { checkData } from "../../../../Utility/checkData";
import axiosJWT from "../../../../Utility/axiosJWT";
import { store } from "../../../../Redux/store";
import { getAllCustomerCategoryCouponsAction } from "../../../../Redux/customerReducer";
import { TextField, Button, Typography } from "@mui/material";

export function GetAllCustomerCategoryCoupons(): JSX.Element {

    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [categoryId, setCategoryId] = useState<number>();
    const [customerId, setCustomerId] = useState<number>();

    const getCouponData = (customerID: number, categoryID: number) => {
        checkData();
        axiosJWT.get(`http://localhost:8080/customer/getAllCategoryCoupons/${customerID}/${categoryID}`).then(res => {
            setCoupons(res.data);
            store.dispatch(getAllCustomerCategoryCouponsAction(res.data));
        })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

    }

    return (
        <div className="GetAllCustomerCategoryCoupons">
            <TextField label="Enter Customer ID" variant="outlined" type="number"
                onChange={(e) => setCustomerId(Number(e.target.value))}
            />
            <br />
            <TextField label="Enter Category ID" variant="outlined" type="number"
                onChange={(e) => setCategoryId(Number(e.target.value))}
            />
            <br />
            <Button variant="contained" color="primary"
                onClick={() => getCouponData(customerId!, categoryId!)}
            >
                Get Category Coupons Data
            </Button>
            {coupons && (
                <div>
                    <div className="CouponsList">
                        {coupons.map(coupon => (
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
