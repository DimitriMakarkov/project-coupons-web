import { useEffect, useState } from "react";
import "./GetAllCustomerCoupons.css";
import { Coupon } from "../../../Model/Coupon";
import { useNavigate } from "react-router-dom";
import { checkData } from "../../../../Utility/checkData";
import { store } from "../../../../Redux/store";
import axiosJWT from "../../../../Utility/axiosJWT";
import { getAllCustomerCouponsAction } from "../../../../Redux/customerReducer";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";

export function GetAllCustomerCoupons(): JSX.Element {

    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        checkData();
        if (store.getState().customer.customerInfo.length == 0) {
            let customer = localStorage.getItem("loggedUser");
            if (customer) {
                let customerData = JSON.parse(customer);
                axiosJWT.get(`http://localhost:8080/customer/getAllCustomerCoupons/${customerData.id}`).then(res => {

                    let allCoupons = [];
                    for (let index = 0; index < res.data.length; index++) {
                        allCoupons.push(res.data[index]);
                    }
                    store.dispatch(getAllCustomerCouponsAction(allCoupons));
                    setCoupons(store.getState().customer.allCustomerCoupons);

                })
                    .catch(err => {
                        navigate("/login")
                    });
            } else {
                setCoupons(store.getState().customer.allCustomerCoupons);
            }
        }
    }, [])

    return (
        <div className="GetAllCustomerCoupons">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Company ID</TableCell>
                            <TableCell align="center">Category ID</TableCell>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">Start Date</TableCell>
                            <TableCell align="center">End Date</TableCell>
                            <TableCell align="center">Amount</TableCell>
                            <TableCell align="center">Price</TableCell>

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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
