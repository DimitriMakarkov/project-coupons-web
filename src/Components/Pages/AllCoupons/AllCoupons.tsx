import { useEffect, useState } from "react";
import { Coupon } from "../../Model/Coupon";
import "./AllCoupons.css";
import { GuestService } from "../../../Services/Guest.Service";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";


export function AllCoupons(): JSX.Element {

    const [coupons, setCoupons] = useState<Coupon[]>([]);

    const getAllCoupons = async () => {
        let res = await GuestService.getInstance().getAllCoupons();
        console.log(res);
        setCoupons(res);
    }

    useEffect(() => {
        getAllCoupons();
    }, [])

    return (
        <div className="AllCoupons">
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
