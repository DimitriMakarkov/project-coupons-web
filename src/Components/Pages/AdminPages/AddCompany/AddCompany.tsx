import { SubmitHandler, useForm } from "react-hook-form";
import { Company } from "../../../Model/Company";
import "./AddCompany.css";
import axiosJWT from "../../../../Utility/axiosJWT";
import { TextField, Button } from "@mui/material";


export function AddCompany(): JSX.Element {

    const { register, handleSubmit, formState: { errors } } = useForm<Company>();

    const onSubmit: SubmitHandler<Company> = (data) => {
        console.log(data);
        data.id = 0;
        axiosJWT.post("http://localhost:8080/admin/addCompany", data)
    }

    return (
        <div className="AddCompany">
            <div className="Box">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Add Company</h1><hr />

                    <TextField label="Enter Company name" {...register("name", { required: true, minLength: 2, maxLength: 15 })} />
                    {errors.name?.type === "required" && <><br /><span style={{ color: "red" }}>minimum name length is 2</span></>}
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
