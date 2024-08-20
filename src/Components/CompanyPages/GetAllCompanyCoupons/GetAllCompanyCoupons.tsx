import { useEffect, useState } from "react";
import { Coupon } from "../../Model/Coupon";
import "./GetAllCompanyCoupons.css";
import { useNavigate } from "react-router-dom";
import { store } from "../../../Redux/store";
import axiosJWT from "../../../Utility/axiosJWT";
import { checkData } from "../../../Utility/checkData";
import { getAllCompanyCouponsAction } from "../../../Redux/companyReducer";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";

export function GetAllCompanyCoupons(): JSX.Element {

    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        checkData();
        if (store.getState().company.companyInfo.length == 0) {
            let company = localStorage.getItem("loggedUser");
            if (company) {
                let companyData = JSON.parse(company);
                axiosJWT.get(`http://localhost:8080/company/getAllCompanyCoupons/${companyData.id}`).then(res => {

                    let allCoupons = [];
                    for (let index = 0; index < res.data.length; index++) {
                        allCoupons.push(res.data[index]);
                    }
                    store.dispatch(getAllCompanyCouponsAction(allCoupons));
                    setCoupons(store.getState().company.allCompanyCoupons);

                })
                    .catch(err => {
                        navigate("/login")
                    });
            } else {
                setCoupons(store.getState().company.allCompanyCoupons);
            }
        }
    }, [])

    const handleDelete = async (row: Coupon) => {

        if (window.confirm("are you sure you want to delete this coupon?")) {
            try {
                await axiosJWT.delete(`http://localhost:8080/company/deleteCoupon/${row.id}`);
            } catch (err) {
                console.error(err);
                navigate("/login");
            }
        }
    };

    return (
        <div className="GetAllCompanyCoupons">
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
                            <TableCell align="center"></TableCell>
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
                                <TableCell align="center"><Button className="doneButton" variant="contained" onClick={() => { navigate(`/updateCoupon?id=${row.id}`) }}>Update</Button></TableCell>
                                <TableCell align="center"><Button className="deletedButton" variant="contained" onClick={() => { handleDelete(row) }}>Deleted</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
