import { SubmitHandler, useForm } from "react-hook-form";
import "./UpdateCustomer.css";
import { Customer } from "../../../Model/Customer";
import { useNavigate } from "react-router-dom";
import axiosJWT from "../../../../Utility/axiosJWT";
import { useEffect } from "react";
import { TextField, Button } from "@mui/material";

export function UpdateCustomer(): JSX.Element {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<Customer>();

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<Customer> = (data) => {
        axiosJWT.put(`http://localhost:8080/admin/updateCustomer/${data.id}`, data)
        navigate("/getAllCustomers");
    }

    useEffect(() => {
        const search = window.location.search
        const params = new URLSearchParams(search);
        const queryValue = params.get('id');
        let mispar: number = Number(queryValue);
        getCustomerData(mispar);
    }, [])

    const getCustomerData = (id: number) => {
        if (id) {
            axiosJWT.get(`http://localhost:8080/admin/getSingleCustomer/${id}`).then(res => {
                setValue('id', res.data.id);
                setValue('firstName', res.data.firstName);
                setValue('lastName', res.data.lastName);
                setValue('email', res.data.email);
            })
        }
    }

    return (
        <div className="UpdateCustomer">
			            <div className="Box">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Update Customer</h1><hr />

                    <TextField label="Enter first name" {...register("firstName", { required: true , min: 2, max: 15 })}
                    InputLabelProps={{ shrink: true }} />
                    {errors.email?.type === "required" && <><br /><span style={{ color: "red" }}>minimum first name length is 2</span></>}
                    <br />

                    <TextField label="Enter last name" {...register("lastName", { required: true , min: 2, max: 15 })}
                    InputLabelProps={{ shrink: true }} />
                    {errors.email?.type === "required" && <><br /><span style={{ color: "red" }}>minimum last name length is 2</span></>}
                    <br />

                    <TextField label="Enter email" {...register("email", { required: true , min: 7, max: 15 })}
                    InputLabelProps={{ shrink: true }} />
                    {errors.email?.type === "required" && <><br /><span style={{ color: "red" }}>minimum email length is 7</span></>}
                    <br />


                    <TextField label="Enter password" type="password" {...register("password", { required: true, minLength: 2, maxLength: 15 })}
                    InputLabelProps={{ shrink: true }} />
                    {errors.password?.type === "required" && <><br /><span style={{ color: "red" }}>minimum password length is 2</span></>}
                    <br />

                    <Button type="submit" variant="contained" color="primary">
                        Enter
                    </Button>
                    <br />
                </form>
            </div>
        </div>
    );
}
