import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import "./GetAllCustomers.css";
import axiosJWT from "../../../../Utility/axiosJWT";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../../../../Redux/store";
import { checkData } from "../../../../Utility/checkData";
import { Customer } from "../../../Model/Customer";
import { getAllCustomersAction } from "../../../../Redux/adminReducer";

export function GetAllCustomers(): JSX.Element {


    const [customers, setCustomers] = useState<Customer[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        checkData();
        if (store.getState().admin.allCustomers.length == 0) {
            axiosJWT.get("http://localhost:8080/admin/getAllCustomers").then(res => {
                let allCustomers = [];
                for (let index = 0; index < res.data.length; index++) {
                    allCustomers.push(res.data[index]);
                }
                store.dispatch(getAllCustomersAction(allCustomers));
                setCustomers(allCustomers);
            })
                .catch(err => {
                    navigate("/login")
                });
        } else {
            setCustomers(store.getState().admin.allCustomers);
        }
    }, [])

    const handleDelete = async (row: Customer) => {
        if (window.confirm("are you sure you want to delete this customer?")) {
            try {
                await axiosJWT.delete(`http://localhost:8080/admin/deleteCustomer/${row.id}`);
            } catch (err) {
                console.error(err);
                navigate("/login");
            }
        }
    };

    return (
        <div className="AllCustomers">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Customer ID</TableCell>
                            <TableCell align="center">Customer First Name</TableCell>
                            <TableCell align="center">Customer Last Name</TableCell>
                            <TableCell align="center">Customer Email</TableCell>
                            <TableCell align="center">Coupon ID</TableCell>
                            <TableCell align="center">Coupon Title</TableCell>
                            <TableCell align="center">Coupon Description</TableCell>
                            <TableCell align="center">Coupon Category ID</TableCell>
                            <TableCell align="center">Coupon Start Date</TableCell>
                            <TableCell align="center">Coupon End Date</TableCell>
                            <TableCell align="center">Coupon Amount</TableCell>
                            <TableCell align="center">Coupon Price</TableCell>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center"></TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.map((row) => (
                            <TableRow
                                key={row.firstName}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="center">{row.id}</TableCell>
                                <TableCell align="center">{row.firstName}</TableCell>
                                <TableCell align="center">{row.lastName}</TableCell>
                                <TableCell align="center">{row.email}</TableCell>

                                <TableCell align="center">
                                    {row.coupons.length > 0 ? (
                                        row.coupons.map(coupon => (
                                            <div key={coupon.id}>{coupon.id}</div>
                                        ))
                                    ) : null}
                                </TableCell>

                                <TableCell align="center">
                                    {row.coupons.length > 0 ? (
                                        row.coupons.map(coupon => (
                                            <div key={coupon.title}>{coupon.title}</div>
                                        ))
                                    ) : null}
                                </TableCell>

                                <TableCell align="center">
                                    {row.coupons.length > 0 ? (
                                        row.coupons.map(coupon => (
                                            <div key={coupon.description}>{coupon.description}</div>
                                        ))
                                    ) : null}
                                </TableCell>

                                <TableCell align="center">
                                    {row.coupons.length > 0 ? (
                                        row.coupons.map(coupon => (
                                            <div key={coupon.categoryid}>{coupon.categoryid}</div>
                                        ))
                                    ) : null}
                                </TableCell>

                                <TableCell align="center">
                                    {row.coupons.length > 0 ? (
                                        row.coupons.map(coupon => (
                                            <div key={coupon.start_date}>{coupon.start_date}</div>
                                        ))
                                    ) : null}
                                </TableCell>

                                <TableCell align="center">
                                    {row.coupons.length > 0 ? (
                                        row.coupons.map(coupon => (
                                            <div key={coupon.end_date}>{coupon.end_date}</div>
                                        ))
                                    ) : null}
                                </TableCell>

                                <TableCell align="center">
                                    {row.coupons.length > 0 ? (
                                        row.coupons.map(coupon => (
                                            <div key={coupon.amount}>{coupon.amount}</div>
                                        ))
                                    ) : null}
                                </TableCell>

                                <TableCell align="center">
                                    {row.coupons.length > 0 ? (
                                        row.coupons.map(coupon => (
                                            <div key={coupon.price}>{coupon.price}</div>
                                        ))
                                    ) : null}
                                </TableCell>
                                <TableCell align="center"><Button className="doneBtn" variant="contained" onClick={() => { navigate(`/updateCustomer?id=${row.id}`) }}>Update</Button></TableCell>
                                <TableCell align="center"><Button className="deletedBtn" variant="contained" onClick={() => { handleDelete(row) }}>Deleted</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
