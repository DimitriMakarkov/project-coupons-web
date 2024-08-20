import { useEffect, useState } from "react";
import "./CategoryCoupons.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Coupon } from "../../Model/Coupon";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";

export function CategoryCoupons(): JSX.Element {

    const { id } = useParams<{ id: string }>();
    const [coupons, setCoupons] = useState<Coupon[]>([]);

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8080/user/getAllCategoryCoupons/${id}`)
                .then(res => {
                    setCoupons(res.data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [id]);

    return (
        <div className="coupons">
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
