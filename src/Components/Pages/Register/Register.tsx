import { useNavigate } from "react-router-dom";
import "./Register.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserDetails } from "../../Model/UserDetails";
import { Typography, TextField, ButtonGroup, Button, MenuItem, Select } from "@mui/material";
import axiosJWT from "../../../Utility/axiosJWT";

export function Register(): JSX.Element {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<UserDetails>();

    const onSubmit: SubmitHandler<UserDetails> = (data) => {
        console.log(data)
        axiosJWT.post("http://localhost:8080/user/register", data)
    }

    return (
        <div className="Register Box">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h4" className="HeadLine">User Register</Typography>
                <TextField label="user name" variant="outlined" {...register("name", { required: true })} fullWidth />
                <br /><br />
                <TextField label="user email" variant="outlined" {
                    ...register("email", { required: true })} fullWidth />
                <br />{errors.email && <span style={{ color: "red" }}>Email is required</span>}
                <br /><br />
                <TextField label="user password" type="password" variant="outlined" {
                    ...register("password", { required: true, minLength: 5, maxLength: 10 })} fullWidth />
                {errors.password?.type == "required" && <><br /><span style={{ color: "red" }}>password is required</span></>}
                {errors.password?.type == "minLength" && <><br /><span style={{ color: "red" }}>password is too short</span></>}
                {errors.password?.type == "maxLength" && <><br /><span style={{ color: "red" }}>password is too long</span></>}
                <br /><br />
                <TextField label="password check" variant="outlined" type="password" fullWidth />
                <br /><br />
                <Select fullWidth {...register("userType")} defaultValue="customer">
                    <MenuItem value="Customer">Customer</MenuItem>
                    <MenuItem value="Company">Company</MenuItem>
                </Select>
                <br /><br />
                <hr />
                <ButtonGroup variant="contained" fullWidth>
                    <Button type="submit" color="primary" >register</Button>
                    <Button color="error" onClick={() => { navigate("/") }}>cancel</Button>
                </ButtonGroup>
            </form>
        </div>
    );
}
