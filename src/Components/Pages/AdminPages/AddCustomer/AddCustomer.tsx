import { SubmitHandler, useForm } from "react-hook-form";
import "./AddCustomer.css";
import { Customer } from "../../../Model/Customer";
import axiosJWT from "../../../../Utility/axiosJWT";
import { TextField, Button } from "@mui/material";

export function AddCustomer(): JSX.Element {


    const { register, handleSubmit, formState: { errors } } = useForm<Customer>();

    const onSubmit: SubmitHandler<Customer> = (data) => {
        console.log(data);
        data.id = 0;
        axiosJWT.post("http://localhost:8080/admin/addCustomer", data)
    }

    return (
        <div className="AddCustomer">
            <div className="Box">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Add Company</h1><hr />

                    <TextField label="Enter first name" {...register("firstName", { required: true, minLength: 2, maxLength: 15 })} />
                    {errors.firstName?.type === "required" && <><br /><span style={{ color: "red" }}>minimum first name length is 2</span></>}
                    <br />

                    <TextField label="Enter last name" {...register("lastName", { required: true, minLength: 2, maxLength: 15 })} />
                    {errors.lastName?.type === "required" && <><br /><span style={{ color: "red" }}>minimum last name length is 2</span></>}
                    <br />

                    <TextField label="Enter email" {...register("email", { required: true })} />
                    {errors.email?.type === "required" && <><br /><span style={{ color: "red" }}>email required</span></>}
                    <br />

                    <TextField label="Enter password" type="password" {...register("password", { required: true, minLength: 2, maxLength: 15 })} />
                    {errors.password?.type === "required" && <><br /><span style={{ color: "red" }}>minimum password length is 2</span></>}
                    <br />

                    <Button type="submit" variant="contained">Enter</Button>
                </form>
            </div>
        </div>
    );
}
