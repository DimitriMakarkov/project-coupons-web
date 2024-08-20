import { SubmitHandler, useForm } from "react-hook-form";
import { Coupon } from "../../Model/Coupon";
import "./UpdateCoupon.css";
import { useNavigate } from "react-router-dom";
import axiosJWT from "../../../Utility/axiosJWT";
import { useEffect } from "react";
import { TextField, Button } from "@mui/material";

export function UpdateCoupon(): JSX.Element {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<Coupon>();

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<Coupon> = (data) => {
        axiosJWT.put(`http://localhost:8080/company/updateCoupon/${data.id}`, data)
        navigate("/getAllCompanyCoupons");
    }

    useEffect(() => {
        const search = window.location.search
        const params = new URLSearchParams(search);
        const queryValue = params.get('id');
        let mispar: number = Number(queryValue);
        getCouponData(mispar);
    }, [])

    const getCouponData = (id: number) => {
        if (id) {
            axiosJWT.get(`http://localhost:8080/company/getSingleCoupon/${id}`).then(res => {
                setValue('id', res.data.id);
                setValue('companyid', res.data.companyid);
                setValue('categoryid', res.data.categoryid);
                setValue('title', res.data.title);
                setValue('start_date', res.data.start_date);
                setValue('end_date', res.data.end_date);
                setValue('description', res.data.description);
                setValue('amount', res.data.amount);
                setValue('price', res.data.price);
            })
        }
    }

    return (
        <div className="UpdateCoupon">
            <div className="Box">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Update Coupon</h1><hr />

                    <TextField label="Coupon ID" {...register("id", { required: true })} disabled
                        InputLabelProps={{ shrink: true }} />
                    {errors.id?.type === "required" && <><br /><span style={{ color: "red" }}>coupon id is required</span></>}
                    <br />

                    <TextField label="Company ID" {...register("companyid", { required: true })} disabled
                        InputLabelProps={{ shrink: true }} />
                    {errors.companyid?.type === "required" && <><br /><span style={{ color: "red" }}>company id is required</span></>}
                    <br />

                    <TextField label="Category ID" {...register("categoryid", { required: true })}
                        InputLabelProps={{ shrink: true }} />
                    {errors.categoryid?.type === "required" && <><br /><span style={{ color: "red" }}>category id is required</span></>}
                    <br />

                    <TextField label="Enter coupon title" {...register("title", { required: true, minLength: 2, maxLength: 15 })}
                        InputLabelProps={{ shrink: true }} />
                    {errors.title?.type === "required" && <><br /><span style={{ color: "red" }}>minimum title length is 2</span></>}
                    <br />

                    <TextField label="Enter start date" {...register("start_date", { required: true, minLength: 8 })}
                        InputLabelProps={{ shrink: true }} />
                    {errors.start_date?.type === "required" && <><br /><span style={{ color: "red" }}>minimum start date length is 8</span></>}
                    <br />

                    <TextField label="Enter end date" {...register("end_date", { required: true, minLength: 9 })}
                        InputLabelProps={{ shrink: true }} />
                    {errors.end_date?.type === "required" && <><br /><span style={{ color: "red" }}>minimum end date length is 8</span></>}
                    <br />

                    <TextField label="Enter description" {...register("description", { required: true, minLength: 5, maxLength: 45 })}
                        InputLabelProps={{ shrink: true }} />
                    {errors.description?.type === "required" && <><br /><span style={{ color: "red" }}>description required</span></>}
                    {errors.description?.type === "minLength" && <><br /><span style={{ color: "red" }}>minimum description length is 5</span></>}
                    {errors.description?.type === "maxLength" && <><br /><span style={{ color: "red" }}>maximum description length is 45</span></>}
                    <br />

                    <TextField label="Enter amount" {...register("amount", { required: true })}
                        InputLabelProps={{ shrink: true }} />
                    {errors.amount?.type === "required" && <><br /><span style={{ color: "red" }}>amount is required</span></>}
                    <br />

                    <TextField label="Enter price" {...register("price", { required: true })}
                        InputLabelProps={{ shrink: true }} />
                    {errors.price?.type === "required" && <><br /><span style={{ color: "red" }}>price is required</span></>}
                    <br />

                    <Button type="submit" variant="contained">Enter</Button>
                </form>
            </div>
        </div>
    );
}
