import Box from "@mui/material/Box";
import {Container, Grid} from "@mui/material";
import UpgradeBox from "./UpgradeBox.tsx";
import {UpgradeType} from "../model/Upgrade.ts";
import {UpgradeNameList} from "../model/UpgradeList.ts";

const ClickUpgradeList = () => {
    return (
        <Container sx={{
            mt: 2,
            textAlign: "center",
            flex: "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
        }}>
            <Container style={{ overflowY: 'auto', textAlign: 'center'}}>
                <Box>
                    <Grid container>
                        {Array.from({ length: 5 }, (_, i) => (
                            <Grid item xs={12} lg={6} key={i}>
                                <div style={{ marginBottom: '10px' }}>
                                    <UpgradeBox id={i} name={UpgradeNameList[i]} type={UpgradeType.CLICK} />
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Container>
    );
}

export default ClickUpgradeList;