import { useEffect, useState } from "react";
import "./GetAllCompanies.css";
import axiosJWT from "../../../../Utility/axiosJWT";
import { Company } from "../../../Model/Company";
import { checkData } from "../../../../Utility/checkData";
import { store } from "../../../../Redux/store";
import { getAllCompaniesAction } from "../../../../Redux/adminReducer";
import { useNavigate } from "react-router-dom";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";

export function GetAllCompanies(): JSX.Element {

    const [companies, setCompanies] = useState<Company[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        checkData();
        if (store.getState().admin.allCompanies.length == 0) {
            axiosJWT.get("http://localhost:8080/admin/getAllCompanies").then(res => {
                let allCompanies = [];
                for (let index = 0; index < res.data.length; index++) {
                    allCompanies.push(res.data[index]);
                }
                store.dispatch(getAllCompaniesAction(allCompanies));
                setCompanies(store.getState().admin.allCompanies);
            })
                .catch(err => {
                    navigate("/login")
                });
        } else {
            setCompanies(store.getState().admin.allCompanies);
        }
    }, [])

    const handleDelete = async (row: Company) => {

        if (window.confirm("are you sure you want to delete this company?")) {
            try {
                await axiosJWT.delete(`http://localhost:8080/admin/deleteCompany/${row.id}`);
            } catch (err) {
                console.error(err);
                navigate("/login");
            }
        }
    };

    return (
        <div className="AllCompanies">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Company ID</TableCell>
                            <TableCell align="center">Company Name</TableCell>
                            <TableCell align="center">Company Email</TableCell>
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
                        {companies.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="center">{row.id}</TableCell>
                                <TableCell align="center">{row.name}</TableCell>
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
                                <TableCell align="center"><Button className="doneBtn" variant="contained" onClick={() => { navigate(`/updateCompany?id=${row.id}`) }}>Update</Button></TableCell>
                                <TableCell align="center"><Button className="deletedBtn" variant="contained" onClick={() => { handleDelete(row) }}>Deleted</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
