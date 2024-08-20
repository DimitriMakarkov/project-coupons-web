import { Box, Button } from "@mui/material";
import { Banner } from "../../Banner/Banner";
import { Categories } from "../../Categories/Categories";
import "./AdminPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function AdminPage(): JSX.Element {

    const [type, setType] = useState<string>("coupons");

    const navigate = useNavigate();

    return (
        <div className="AdminPage">

            <Box className="banner">
                <Banner />
            </Box>

            <div className="menuButtons">
                <Button variant="text" onClick={() => { navigate("/addCompany") }}>Add Company</Button>
                <Button variant="text" onClick={() => { navigate("/getAllCompanies") }}>Get All Companies</Button>
                <Button variant="text" onClick={() => { navigate("/getAllCoupons") }}>Get All Coupons</Button>
                <Button variant="text" onClick={() => { navigate("/getSingleCompany/:id") }}>Get Single Company</Button>
                <Button variant="text" onClick={() => { navigate("/addCustomer") }}>Add Customer</Button>
                <Button variant="text" onClick={() => { navigate("/getAllCustomers") }}>Get All Customers</Button>
                <Button variant="text" onClick={() => { navigate("/getSingleCustomer/:id") }}>Get Single Customer</Button>
                <Button variant="text" onClick={() => { navigate("/getAllCategoryCoupons/:id") }}>Get All Category Coupons</Button>
            </div>

            <Box className="categories">
                <Categories />

            </Box>
        </div>
    );
}
