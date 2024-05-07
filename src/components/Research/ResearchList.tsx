import Box from "@mui/material/Box";
import {researchList} from "../../model/ResearchList.ts";
import ResearchBox from "./ResearchBox.tsx";
import {useGame} from "../../context/GameContext.ts";
import {useEffect, useState} from "react";
import {Research} from "../../model/Research.ts";
import Button from "@mui/material/Button";
import {ShoppingCart} from "@mui/icons-material";
import {formatNumber} from "../Home/BalanceComponent.tsx";

const ResearchList = () => {
    const {game, setGame} = useGame()
    const [filteredResearchList, setFilteredResearchList] = useState<Research[]>([]);

    useEffect(() => {
        if(game.researches) {
            setFilteredResearchList(researchList.filter(research => !game.researches[research.id]).slice(0, 3));
        }
    }, [game.researches]);

    const unlockResearch = () => {
        setGame({...game, unlockedResearch: true, balance: game.balance - 1000000})
    }

    if(!game.unlockedResearch) {
        return (
            <Box sx={{
                m: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
                <Button sx={{mt: 3, width: '60%'}} disabled={game.balance <= 1000000}
                        startIcon={<ShoppingCart/>}
                        variant="contained" color="secondary" onClick={unlockResearch}>Schalte
                    Forschung
                    frei
                    ({formatNumber(1000000)}€)</Button>
            </Box>
        );
    }

    if (filteredResearchList.length > 0) {
        return (
            <Box sx={{
                mt: 3,
                p: 2,
                bgcolor: "gray",
                borderRadius: {lg: 5, xs: 3},
            }}>
                    <Box sx={{
                        borderRadius: {lg: 5, xs: 3},
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2
                    }}>
                        {filteredResearchList.map((research) => (
                            <ResearchBox key={research.id} research={research}/>
                        ))}
                    </Box>
            </Box>
        )
    }
}

export default ResearchList