import {Typography} from "@mui/material";
import {formatNumber} from "./BalanceComponent.tsx";
import Box from "@mui/material/Box";

const GeekyCoinsComponent = ({geekyCoins}: {geekyCoins: number}) => {
    return (
        <Box sx={{marginBottom: '10px'}}>
            <Typography variant="h6" gutterBottom>
                GeekyCoins {formatNumber(geekyCoins)}
            </Typography>
        </Box>
    )
}

export default GeekyCoinsComponent