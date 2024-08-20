import { useState } from "react";
import { Coupon } from "../../../Model/Coupon";
import "./GetAllCategoryCoupons.css";
import { checkData } from "../../../../Utility/checkData";
import { getAllCategoryCouponsAction } from "../../../../Redux/adminReducer";
import { store } from "../../../../Redux/store";
import axiosJWT from "../../../../Utility/axiosJWT";
import { TextField, Button, Typography } from "@mui/material";

export function GetAllCategoryCoupons(): JSX.Element {

    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [categoryId, setCategoryId] = useState<number>();

    const getCouponData = (id: number) => {
        checkData();
        if (store.getState().admin.allCoupons.length == 0) {
            axiosJWT.get(`http://localhost:8080/admin/getAllCategoryCoupons/${id}`).then(res => {
                setCoupons(res.data);
                store.dispatch(getAllCategoryCouponsAction(res.data));
            })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }

    return (
        <div className="GetAllCategoryCoupons">
            <TextField
                label="Enter Category ID"
                variant="outlined"
                type="number"
                onChange={(e) => setCategoryId(Number(e.target.value))}
            />
            <br />
            <Button
                variant="contained"
                color="primary"
                onClick={() => getCouponData(categoryId!)}
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