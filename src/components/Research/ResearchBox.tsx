import Box from "@mui/material/Box";
import {LinearProgress, Typography} from "@mui/material";
import {Research} from "../../model/Research.ts";
import Button from "@mui/material/Button";
import {ShoppingCart} from "@mui/icons-material";
import {formatNumber} from "../Home/BalanceComponent.tsx";
import {useGame} from "../../context/GameContext.ts";
import React, {useEffect, useState} from "react";
import {ResearchContext, ResearchContextType} from "../../context/ResearchContext.tsx";

type ResearchProps = {
    research: Research
}


const ResearchBox = ({research}: ResearchProps) => {
    const {game, setGame} = useGame()
    const {isResearching, setIsResearching} = React.useContext(ResearchContext) as ResearchContextType
    const [boughtId, setBought] = useState<number | null>(null)
    const time = 10000
    const [progress, setProgress] = useState(0)

    const unlockResearch = () => {
        setBought(research.id)
        setIsResearching(true)
        setProgress(0)
        setGame((prev) => ({...prev, balance: prev.balance - research.price}))
        setTimeout(() => {
            setGame((prev) => ({...prev, researches: {...prev.researches, [research.id]: true}}))
            setIsResearching(false)
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
            background: "black", borderRadius: {
                lg: 5, xs: 3
            },
            color: "#77fa3c",
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #49da3a',
        }}>
            <Typography variant='subtitle1'>{research.name}</Typography>
            <Typography variant='subtitle2'>{research.description}</Typography> <br/>
            <Typography variant='inherit'>Effekt: {research.bonusText}</Typography>
            <Button sx={{width: '80%', mb: 2}} disabled={game.balance <= research.price || isResearching}
                    startIcon={!isResearching && <ShoppingCart/>}
                    variant="contained" onClick={unlockResearch}>
                {!isResearching && `Schalte Forschung frei (${formatNumber(research.price)}€)`}
                {isResearching && boughtId == research.id && research.researchText}
                {isResearching && boughtId !== research.id && `Eine Forschung läuft bereits...`}
            </Button>
            {isResearching && boughtId == research.id &&
                <Box sx={{width: '90%', mb: 2}}>
                    <LinearProgress variant="determinate" value={progress}/>
                    <Typography>{progress}%</Typography>
                </Box>
            }
        </Box>
    )
}

export default ResearchBox