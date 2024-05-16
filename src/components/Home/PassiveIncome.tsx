import {Typography} from "@mui/material";
import {formatNumber} from "./BalanceComponent.tsx";
import Box from "@mui/material/Box";
import {useGame} from "../../context/GameContext.ts";

const PassiveIncome = ({incomeBonus}: {incomeBonus: number}) => {
    const {game} = useGame()
    return (
        <Box sx={{marginBottom: '20px'}}>
            <Typography fontWeight='bold'  variant="h6" gutterBottom color={game.researches[8] ? "gold" : "#00ff00"}>
                Passives Einkommen {formatNumber(incomeBonus)}€/s
            </Typography>
        </Box>
    )
}

export default PassiveIncome