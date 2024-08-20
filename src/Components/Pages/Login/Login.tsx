import { useNavigate } from "react-router-dom";
import "./Login.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { store } from "../../../Redux/store";
import { Typography, TextField, Select, MenuItem, Checkbox, ButtonGroup, Button } from "@mui/material";
import { AuthService } from "../../../Services/Auth.Service";
import { SignInProps } from "../../Types/LoginTypes";
import { useEffect } from "react";
import { getCompanyInfoAction } from "../../../Redux/companyReducer";

type userLoginData = {
    userEmail: string;
    userPass: string;
    userType: string;
    userRemember: boolean;
}

export function Login(): JSX.Element {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<userLoginData>();

    const checkLocalStorage = () => {
        const userType = localStorage.getItem("userType");
        if (userType) {
            console.log("user is logged in ", userType);
            navigate(`/${userType}`);
        }
    }

    useEffect(() => {
        checkLocalStorage();
    }, [])

    const makeLogin: SubmitHandler<userLoginData> = async (data) => {
        let user: SignInProps = {
            "email": data.userEmail,
            "password": data.userPass,
            "userType": data.userType.toUpperCase()
        }
        const result = await AuthService.getInstance().login(user);
        if (result) {
            switch (user.userType) {
                case "COMPANY":
                    store.dispatch(getCompanyInfoAction(result));
                    localStorage.setItem("userType", "COMPANY");
                    navigate("/COMPANY");
                    break;

                case "CUSTOMER":
                    localStorage.setItem("userType", "CUSTOMER");
                    navigate("/CUSTOMER");
                    break;

                case "ADMIN":
                    localStorage.setItem("userType", "ADMIN");
                    navigate("/ADMIN");
                    break;
                default:
                    navigate(`/${result.userType.toUpperCase()}`);
            }
        }
    }

    return (
        <div className="Login Box">
            <form onSubmit={handleSubmit(makeLogin)}>
                <Typography variant="h4" className="HeadLine">User Login</Typography><hr />
                <TextField label="user email" variant="outlined" {...register("userEmail")} /><br /><br />
                <TextField label="user password" variant="outlined" type="password" {...register("userPass")} /><br /><br />
                <Select fullWidth {...register("userType")} defaultValue="customer">
                    <MenuItem value="Customer">Customer</MenuItem>
                    <MenuItem value="Company">Company</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                </Select>
                <br />
                <ButtonGroup variant="contained" fullWidth>
                    <Button type="submit" color="success" style={{ marginRight: 10 }}>Login</Button>
                    <Button color="error" onClick={() => { navigate("/") }}>Cancel</Button>
                </ButtonGroup>
            </form>
        </div>
    );
}
