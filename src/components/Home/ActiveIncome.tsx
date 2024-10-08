import {Typography} from "@mui/material";
import {formatNumber} from "./BalanceComponent.tsx";
import Box from "@mui/material/Box";
import {useGame} from "../../context/GameContext.ts";

const ActiveIncome = ({activeIncome}: {activeIncome: number}) => {
    const {game} = useGame()
    return (
        <Box sx={{marginBottom: '10px'}}>
            <Typography fontWeight='bold'  variant="h6" gutterBottom color={game.researches[8] ? "gold" : "#00ff00"}>
                Klick Bonus {formatNumber(activeIncome)}€
            </Typography>
        </Box>
    )
}

export default ActiveIncome