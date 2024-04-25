import Box from "@mui/material/Box";
import {LinearProgress, Typography} from "@mui/material";
import {Research} from "../../model/Research.ts";
import Button from "@mui/material/Button";
import {ShoppingCart} from "@mui/icons-material";
import {formatNumber} from "../BalanceComponent.tsx";
import {useGame} from "../../context/GameContext.ts";
import {useEffect, useState} from "react";

type ResearchProps = {
    research: Research
}


const ResearchBox = ({research}: ResearchProps) => {
    const {game, setGame} = useGame()
    const [bought, setBought] = useState(false)
    const time = 10000
    const [progress, setProgress]= useState(0)

    const unlockResearch = () => {
        setBought(true)
        setProgress(0)
        setTimeout(() => {
            setGame({
                ...game,
                balance: game.balance - research.price,
                researches: {...game.researches, [research.id]: true}
            })
        }, time)
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 1));
        }, 100);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Box sx={{
            background: "darkgray", borderRadius: {
                lg: 5, xs: 3
            },
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Typography variant='subtitle1'>{research.name}</Typography>
            <Typography variant='subtitle2'>{research.description}</Typography> <br/>
            <Typography variant='inherit'>Effekt: {research.bonusText}</Typography>
            <Button sx={{width: '80%', mb: 2}} disabled={game.balance <= research.price || bought}
                    startIcon={!bought && <ShoppingCart/>}
                    variant="contained" color="secondary" onClick={unlockResearch}>
                {!bought && `Schalte Forschung frei (${formatNumber(research.price)}€)`}
                {bought && `Es wird fleißig geforscht...`}
                </Button>
            {bought &&
                <Box sx={{ width: '90%', mb: 2 }}>
                    <LinearProgress variant="determinate" value={progress} />
                    <Typography>{progress}%</Typography>
                </Box>
            }
        </Box>
    )
}

export default ResearchBox