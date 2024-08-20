import { useEffect, useState } from "react";
import { Company } from "../../Model/Company";
import "./AllCompanies.css";
import { GuestService } from "../../../Services/Guest.Service";
import { Typography } from "@mui/material";

export function AllCompanies(): JSX.Element {

    const [companies, setCompanies] = useState<Company[]>([]);

    const getAllCompanies = async () => {
        let res = await GuestService.getInstance().getAllCompanies();
        console.log(res);
        setCompanies(res);
    }

    useEffect(() => {
        getAllCompanies();
    }, [])

    return (
        <div className="AllCompanies">
            <div className="CompaniesList">
                {companies.map(company => (
                    <div key={company.id} className="Companies Box">
                        <Typography>Title: {company.email}</Typography>
                        <Typography>Description: {company.name}</Typography>

                    </div>
                ))}
            </div>
        </div>
    );
}
