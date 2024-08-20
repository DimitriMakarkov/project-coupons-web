import { Box } from "@mui/material";
import "./Categories.css";
import { useNavigate } from "react-router-dom";
import food from "../../../Assets/Images/food.jpg";
import appliances from "../../../Assets/Images/appliances.jpg";
import restaurant from "../../../Assets/Images/restaurant.jpg";
import vacation from "../../../Assets/Images/vacation.jpg";

export function Categories(): JSX.Element {
    const navigate = useNavigate();

    const handleNavigate = (url: string, id: number) => {
        navigate(`${url}/${id}`);
    };


    return (
        <div className="Categories" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
            <Box
                height={200}
                width={200}
                my={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
                p={2}
                sx={{
                    borderRadius: '30px',
                    backgroundImage: `url(${food})`,
                    cursor: 'pointer'
                }}
                onClick={() => handleNavigate('/categoryCoupons', 1)}
            >
                Food
            </Box>
            <Box
                height={200}
                width={200}
                my={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
                p={2}
                sx={{
                    borderRadius: '30px',
                    backgroundImage: `url(${appliances})`,
                    cursor: 'pointer'
                }}
                onClick={() => handleNavigate('/categoryCoupons', 2)}
            >
                Electricity
            </Box>
            <Box
                height={200}
                width={200}
                my={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
                p={2}
                sx={{
                    borderRadius: '30px',
                    backgroundImage: `url(${restaurant})`,
                    cursor: 'pointer'
                }}
                onClick={() => handleNavigate('/categoryCoupons', 3)}
            >
                Restaurant
            </Box>
            <Box
                height={200}
                width={200}
                my={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
                p={2}
                sx={{
                    borderRadius: '30px',
                    backgroundImage: `url(${vacation})`,
                    cursor: 'pointer'
                }}
                onClick={() => handleNavigate('/categoryCoupons', 4)}
            >
                Vacation
            </Box>
        </div>
    );
}
