import { Box, Button } from "@mui/material";
import "./Main.css";
import { Banner } from "../../Pages/Banner/Banner";
import { Categories } from "../../Pages/Categories/Categories";
import { useState } from "react";
import { Coupon } from "../../Model/Coupon";
import { AllCoupons } from "../../Pages/AllCoupons/AllCoupons";
import { useNavigate } from "react-router-dom";

export function Main(): JSX.Element {

    const navigate = useNavigate();

    return (
        <div className="Main">

            <Box className="banner">
                <Banner />
            </Box>

            <div className="menuButtons">
			<Button variant="text" onClick={()=>navigate("/coupons")}>All Coupons</Button>
            <Button variant="text" onClick={()=>navigate("/companies")}>All Companies</Button>
            </div>

            <Box className="categories">
                <Categories />

            </Box>
        </div>
    );
}
