import Box from "@mui/material/Box";
import {researchList} from "../../model/ResearchList.ts";
import ResearchBox from "./ResearchBox.tsx";

const Research = () => {
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
            {researchList.map((research) => (
                <ResearchBox key={research.id} research={research}/>
            ))}
        </Box>
    )
}

export default Research