import { useState } from "react";
import { Coupon } from "../../Model/Coupon";
import "./GetAllCompanyCategoryCoupons.css";
import { checkData } from "../../../Utility/checkData";
import { store } from "../../../Redux/store";
import axiosJWT from "../../../Utility/axiosJWT";
import { getAllCategoryCouponsAction } from "../../../Redux/adminReducer";
import { TextField, Button, Typography } from "@mui/material";

export function GetAllCompanyCategoryCoupons(): JSX.Element {

    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [categoryId, setCategoryId] = useState<number>();
    const [companyId, setCompanyId] = useState<number>();

    const getCouponData = (companyID: number, categoryID: number) => {
        checkData();
        axiosJWT.get(`http://localhost:8080/company/getAllCategoryCoupons/${companyID}/${categoryID}`).then(res => {
            setCoupons(res.data);
            store.dispatch(getAllCategoryCouponsAction(res.data));
        })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

    }

    return (
        <div className="GetAllCompanyCategoryCoupons">
            <TextField
                label="Enter Company ID"
                variant="outlined"
                type="number"
                onChange={(e) => setCompanyId(Number(e.target.value))}
            />
            <br />
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
                onClick={() => getCouponData(companyId!, categoryId!)}
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
