import { SubmitHandler, useForm } from "react-hook-form";
import "./UpdateCompany.css";
import { Company } from "../../../Model/Company";
import { useNavigate } from "react-router-dom";
import axiosJWT from "../../../../Utility/axiosJWT";
import { useEffect } from "react";
import { TextField, Button } from "@mui/material";

export function UpdateCompany(): JSX.Element {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<Company>();

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<Company> = (data) => {
        axiosJWT.put(`http://localhost:8080/admin/updateCompany/${data.id}`, data)
        navigate("/getAllCompanies");
    }

    useEffect(() => {
        const search = window.location.search
        const params = new URLSearchParams(search);
        const queryValue = params.get('id');
        let mispar: number = Number(queryValue);
        getCompanyData(mispar);
    }, [])

    const getCompanyData = (id: number) => {
        if (id) {
            axiosJWT.get(`http://localhost:8080/admin/getSingleCompany/${id}`).then(res => {
                setValue('id', res.data.id);
                setValue('name', res.data.name);
                setValue('email', res.data.email);
            })
        }
    }

    return (
        <div className="UpdateCompany">
            <div className="Box">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Update Company</h1><hr />

                    <TextField label="Enter Company name" {...register("name")} disabled
                        InputLabelProps={{ shrink: true }} />
                    <br />

                    <TextField label="Enter email" {...register("email", { required: true, min: 7, max: 15 })}
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
