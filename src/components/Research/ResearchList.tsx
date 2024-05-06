import Box from "@mui/material/Box";
import {researchList} from "../../model/ResearchList.ts";
import ResearchBox from "./ResearchBox.tsx";
import {useGame} from "../../context/GameContext.ts";
import {useEffect, useState} from "react";
import {Research} from "../../model/Research.ts";
import Button from "@mui/material/Button";
import {Collapse} from "@mui/material";

const ResearchList = () => {
    const {game} = useGame()
    const [filteredResearchList, setFilteredResearchList] = useState<Research[]>([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if(game.researches) {
            setFilteredResearchList(researchList.filter(research => !game.researches[research.id]).slice(0, 3));
        }
    }, [game.researches]);
    if (filteredResearchList.length > 0) {
        return (
            <Box sx={{
                width: '95%',
                mt: 3,
                p: 2,
                bgcolor: "lightgray",
                borderRadius: {lg: 5, xs: 3},
            }}>
                <Button onClick={() => setOpen(!open)} variant="contained" color="primary" sx={{mb: 2}}>
                    {open ? 'Forschung Zuklappen' : 'Forschung'}
                </Button>
                <Collapse in={open} sx={{
                    width: '100%',
                }}>
                    <Box sx={{
                        bgcolor: "lightgray",
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
                </Collapse>
            </Box>
        )
    }
}

export default ResearchList