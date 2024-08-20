import { SubmitHandler, useForm } from "react-hook-form";
import { Coupon } from "../../Model/Coupon";
import "./AddCoupon.css";
import axiosJWT from "../../../Utility/axiosJWT";
import { TextField, Button } from "@mui/material";
import { useEffect } from "react";

export function AddCoupon(): JSX.Element {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<Coupon>();

    const onSubmit: SubmitHandler<Coupon> = (data) => {
        console.log(data);
        data.id = 0;
        axiosJWT.post("http://localhost:8080/company/addCoupon", data)
    }

    useEffect(() => {
        let company = localStorage.getItem("loggedUser");
        if (company) {
            let companyData = JSON.parse(company);
            setValue('companyid', companyData.id);
        }
    }, [])

    return (
        <div className="AddCoupon">
            <div className="Box">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Add Coupon</h1><hr />

                    <TextField label="Company ID" {...register("companyid", { required: true })} disabled />
                    {errors.companyid?.type === "required" && <><br /><span style={{ color: "red" }}>company id is required</span></>}
                    <br />

                    <TextField label="Category ID" {...register("categoryid", { required: true })} />
                    {errors.categoryid?.type === "required" && <><br /><span style={{ color: "red" }}>category id is required</span></>}
                    <br />

                    <TextField label="Enter coupon title" {...register("title", { required: true, minLength: 2, maxLength: 15 })} />
                    {errors.title?.type === "required" && <><br /><span style={{ color: "red" }}>minimum title length is 2</span></>}
                    <br />

                    <TextField label="Enter start date" {...register("start_date", { required: true, minLength: 8 })} />
                    {errors.start_date?.type === "required" && <><br /><span style={{ color: "red" }}>minimum start date length is 8</span></>}
                    <br />

                    <TextField label="Enter end date" {...register("end_date", { required: true, minLength: 9 })} />
                    {errors.end_date?.type === "required" && <><br /><span style={{ color: "red" }}>minimum end date length is 8</span></>}
                    <br />

                    <TextField label="Enter description" {...register("description", { required: true, minLength: 5, maxLength: 45 })} />
                    {errors.description?.type === "required" && <><br /><span style={{ color: "red" }}>description required</span></>}
                    {errors.description?.type === "minLength" && <><br /><span style={{ color: "red" }}>minimum description length is 5</span></>}
                    {errors.description?.type === "maxLength" && <><br /><span style={{ color: "red" }}>maximum description length is 45</span></>}
                    <br />

                    <TextField label="Enter amount" {...register("amount", { required: true })} />
                    {errors.amount?.type === "required" && <><br /><span style={{ color: "red" }}>amount is required</span></>}
                    <br />

                    <TextField label="Enter price" {...register("price", { required: true })} />
                    {errors.price?.type === "required" && <><br /><span style={{ color: "red" }}>price is required</span></>}
                    <br />

                    <Button type="submit" variant="contained">Enter</Button>
                </form>
            </div>
        </div>
    );
}
