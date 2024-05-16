import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";

export function formatNumber(balance: number) {
    const numString = balance.toString();
    return numString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

type BalanceComponentProps = {
    balance: number
}

function BalanceComponent({ balance }: BalanceComponentProps) {
    const formattedBalance = formatNumber(balance)

    return (
        <Box sx={{marginBottom: '10px', marginTop: '10px', color: '#00ff00'}}>
            <Typography fontWeight='bold' variant="h4">
                Balance {formattedBalance}€
            </Typography>
        </Box>
    );
}

export default BalanceComponent;