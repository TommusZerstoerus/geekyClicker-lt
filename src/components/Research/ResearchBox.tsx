import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import {Research} from "../../model/Research.ts";
import Button from "@mui/material/Button";
import {ShoppingCart} from "@mui/icons-material";
import {formatNumber} from "../BalanceComponent.tsx";
import {useGame} from "../../context/GameContext.ts";

type ResearchProps = {
    research: Research
}
const ResearchBox = ({research}: ResearchProps) => {
    const {game, setGame} = useGame()

    const unlockResearch = () => {
        setGame({
            ...game,
            balance: game.balance - research.price,
            researches: {...game.researches, [research.id]: true}
        })
    }


    return (
        <Box sx={{background: "darkgray", borderRadius: {lg: 5, xs: 3}, width: '100%'}}>
            <Typography variant='subtitle1'>{research.name}</Typography>
            <Typography variant='subtitle2'>{research.description}</Typography> <br/>
            <Typography variant='inherit'>Effekt: {research.bonusText}</Typography>
            <Button sx={{width: '80%', mb: 2}} disabled={game.balance <= research.price}
                    startIcon={<ShoppingCart/>}
                    variant="contained" color="secondary" onClick={unlockResearch}>Schalte Forschung
                frei
                ({formatNumber(research.price)}€)</Button>
        </Box>
    )
}

export default ResearchBox