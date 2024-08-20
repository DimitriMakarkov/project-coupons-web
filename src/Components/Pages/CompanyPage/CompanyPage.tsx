import { Box, Button } from "@mui/material";
import { Banner } from "../Banner/Banner";
import { Categories } from "../Categories/Categories";
import "./CompanyPage.css";
import { useNavigate } from "react-router-dom";

export function CompanyPage(): JSX.Element {

    const navigate = useNavigate();

    return (
        <div className="CompanyPage">
            <Box className="banner">
                <Banner />
            </Box>

            <div className="menuButtons">
                <Button variant="text" onClick={() => { navigate("/addCoupon") }}>Add Coupon</Button>
                <Button variant="text" onClick={() => { navigate("/getAllCompanyCoupons") }}>Get All Company Coupons</Button>
                <Button variant="text" onClick={() => { navigate("/getAllCompanyCategoryCoupons") }}>Get All Category Coupons</Button>
                <Button variant="text" onClick={() => { navigate("/getAllCompanyMaxPriceCoupons") }}>Get All Max Price Coupons</Button>
                <Button variant="text" onClick={() => { navigate("/getCompanyInfo/:id") }}>Get Company Info</Button>
            </div>

            <Box className="categories">
                <Categories />

            </Box>
        </div>
    );
}
