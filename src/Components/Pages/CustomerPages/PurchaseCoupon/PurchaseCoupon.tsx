import { useEffect, useState } from "react";
import { GuestService } from "../../../../Services/Guest.Service";
import { Coupon } from "../../../Model/Coupon";
import "./PurchaseCoupon.css";
import { useNavigate } from "react-router-dom";
import axiosJWT from "../../../../Utility/axiosJWT";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";

export function PurchaseCoupon(): JSX.Element {


    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const navigate = useNavigate();

    const getAllCoupons = async () => {
        let res = await GuestService.getInstance().getAllCoupons();
        console.log(res);
        setCoupons(res);
    }

    useEffect(() => {
        getAllCoupons();
    }, [])

    const handlePurchase = async (row: Coupon) => {

        if (window.confirm("are you sure you want to purchase this coupon?")) {
            try {
                let customer = localStorage.getItem("loggedUser");
                if (customer) {
                    let customerData = JSON.parse(customer);
                    await axiosJWT.post(`http://localhost:8080/customer/purchaseCoupon/${row.id}/${customerData.id}`);
                    window.location.reload();
                }
            } catch (err) {
                console.error(err);
                navigate("/login");
            }
        }
    };


    return (
        <div className="PurchaseCoupon">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Company ID</TableCell>
                            <TableCell align="center">Category ID</TableCell>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">Start Date</TableCell>
                            <TableCell align="center">End Date</TableCell>
                            <TableCell align="center">Amount</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center"></TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {coupons.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="center">{row.companyid}</TableCell>
                                <TableCell align="center">{row.categoryid}</TableCell>
                                <TableCell align="center">{row.title}</TableCell>
                                <TableCell align="center">{row.description}</TableCell>
                                <TableCell align="center">{row.start_date}</TableCell>
                                <TableCell align="center">{row.end_date}</TableCell>
                                <TableCell align="center">{row.amount}</TableCell>
                                <TableCell align="center">{row.price}</TableCell>
                                <TableCell align="center"><Button className="deletedBtn" variant="contained" onClick={() => { handlePurchase(row) }}>Purchase</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
