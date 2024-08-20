import { Box, Button, ButtonGroup, Paper } from "@mui/material";
import "./Header.css";
import logo from "../../../Assets/Images/logo.png";
import { store } from "../../../Redux/store";
import { logoutAction } from "../../../Redux/authReducer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../../Services/Auth.Service";

export function Header(): JSX.Element {

    const [isLogged, setLogged] = useState(false);
    const [userName, setName] = useState("Guest");
    const navigate = useNavigate();

    store.subscribe(() => {
        setName(store.getState().auth.name);
        setLogged(store.getState().auth.isLogged);
    })

    useEffect(()=>{
        const logged = AuthService.getInstance().checkUser();
        setLogged(logged);
        })

    return (
        <Box className="header">
            <div className="login">
                Hello {userName} <br />
                <ButtonGroup variant="contained" fullWidth>
                    <Button type="submit" color={isLogged ? "error" : "primary"}
                        onClick={() => {
                            if (isLogged) {
                                sessionStorage.removeItem("jwt");
                                localStorage.clear();
                                store.dispatch(logoutAction());
                                navigate("/");
                            } else {
                                navigate("/login");
                            }
                        }}>{isLogged ? "Logout" : "Login" }</Button>
                    {!isLogged && <Button color="success" onClick={() => { navigate("/register") }}>register</Button>}
                </ButtonGroup>
            </div>

            <Paper className="logo">
                <img src={logo} width={80} />
            </Paper>

        </Box>
    );
}
