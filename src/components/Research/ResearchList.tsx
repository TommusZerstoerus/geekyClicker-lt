import Box from "@mui/material/Box";
import {researchList} from "../../model/ResearchList.ts";
import ResearchBox from "./ResearchBox.tsx";
import {useGame} from "../../context/GameContext.ts";
import {Research} from "../../model/Research.ts";
import {useEffect, useState} from "react";

const Research = () => {
    const {game} = useGame()
    const [filteredResearchList, setFilteredResearchList] = useState<Research[]>([]);

    useEffect(() => {
        const filteredList = researchList.slice(0, 3).filter(research => {
            return game.researches[research.id] === 0;
        });
        setFilteredResearchList(filteredList);
    }, [game.researches]);

    return (
        <Box sx={{
            width: {lg: '100%'},
            mt: 3,
            p: 3,
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
    )
}

export default Research