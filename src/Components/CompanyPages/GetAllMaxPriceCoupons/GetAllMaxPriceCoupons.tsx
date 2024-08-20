import { useState } from "react";
import { Coupon } from "../../Model/Coupon";
import "./GetAllMaxPriceCoupons.css";
import { checkData } from "../../../Utility/checkData";
import axiosJWT from "../../../Utility/axiosJWT";
import { store } from "../../../Redux/store";
import { getAllMaxPriceCouponsAction } from "../../../Redux/companyReducer";
import { TextField, Button, Typography } from "@mui/material";

export function GetAllMaxPriceCoupons(): JSX.Element {

    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [maxPrice, setMaxPrice] = useState<number>();
    const [companyId, setCompanyId] = useState<number>();

    const getCouponData = (companyID: number, maxPrice: number) => {
        checkData();
        axiosJWT.get(`http://localhost:8080/company/getAllMaxPriceCoupons/${companyID}/${maxPrice}`).then(res => {
            setCoupons(res.data);
            store.dispatch(getAllMaxPriceCouponsAction(res.data));
        })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

    }

    return (
        <div className="GetAllMaxPriceCoupons">
            <TextField label="Enter Company ID" variant="outlined" type="number"
                onChange={(e) => setCompanyId(Number(e.target.value))}
            />
            <br />
            <TextField label="Enter Max Price" variant="outlined" type="number"
                onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
            <br />
            <Button variant="contained" color="primary"
                onClick={() => getCouponData(companyId!, maxPrice!)}
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
