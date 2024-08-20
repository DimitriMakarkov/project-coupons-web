import { useNavigate } from "react-router-dom";
import "./CustomerPage.css";
import { Box, Button } from "@mui/material";
import { Banner } from "../Banner/Banner";
import { Categories } from "../Categories/Categories";

export function CustomerPage(): JSX.Element {

    const navigate = useNavigate();

    return (
        <div className="CustomerPage">
<Box className="banner">
                <Banner />
            </Box>

            <div className="menuButtons">
            <Button variant="text" onClick={() => { navigate("/purchaseCoupon") }}>Purchase Coupon</Button>
            <Button variant="text" onClick={() => { navigate("/getAllCustomerCoupons") }}>Get All Customer Coupons</Button>
            <Button variant="text" onClick={() => { navigate("/getAllCustomerCategoryCoupons") }}>Get All Category Coupons</Button>
            <Button variant="text" onClick={() => { navigate("/getAllCustomerMaxPriceCoupons") }}>Get All Max Price Coupons</Button>
            <Button variant="text" onClick={() => { navigate("/getCustomerInfo/:id") }}>Get Customer Info</Button>
            </div>

            <Box className="categories">
                <Categories />

            </Box>
        </div>
    );
}
