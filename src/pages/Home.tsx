import {Container, Divider, Grid, TextField} from "@mui/material";
import Header from "../components/Header.tsx";
import ClickUpgradeList from "../components/ClickUpgradeList.tsx";
import IncomeUpgradeList from "../components/IncomeUpgradeList.tsx";
import Box from "@mui/material/Box";
import icon from "../assets/icon.svg";
import {useEffect, useRef, useState} from "react";
import {useGame} from "../context/GameContext.ts";
import BalanceComponent from "../components/Home/BalanceComponent.tsx";
import {UpgradeBonusList, UpgradeMileStoneList} from "../model/UpgradeList.ts";
import {animated, useSpring} from '@react-spring/web'
import StocksTable from "../components/Stocks/StocksTable.tsx";
import Button from "@mui/material/Button";
import PassiveIncome from "../components/Home/PassiveIncome.tsx";
import ActiveIncome from "../components/Home/ActiveIncome.tsx";
import RouletteTable from "../components/Roulette/Roulette.tsx";
import ResearchList from "../components/Research/ResearchList.tsx";
import {researchList} from "../model/ResearchList.ts";
import GeekyCoinsComponent from "../components/Home/GeekyCoinsComponent.tsx";
import {jsHack} from "../model/jsHack.ts";
import Typography from "@mui/material/Typography";

const elementValueToName = (value: number) => {
    switch (value) {
        case 0:
            return "Klick"
        case 1:
            return "Einkommen"
        case 2:
            return "Roulette"
        case 3:
            return "Aktien"
        default:
            return "Forschung"
    }
}

const Home = () => {
    const [clickBonus, setClickBonus] = useState(0);
    const [incomeBonus, setIncomeBonus] = useState(0);
    const [wobble, setWobble] = useState(false)
    const {game, setGame} = useGame()
    const [displayedElement, setDisplayedElement] = useState(0)
    const jsHackText = jsHack.split(/\n/);
    const [nextWordIndex, setNextWordIndex] = useState(0);
    const [hackText, setHackText] = useState("");
    const preRef = useRef<HTMLPreElement>(null);

    const {transform} = useSpring({
        from: {transform: 'scale(1)'},
        to: async next => {
            if (wobble) {
                await next({transform: 'scale(1.1)'});
                await next({transform: 'scale(1)'});
                setWobble(false);
            }
        },
        config: {duration: 100, easing: t => t},
    });

    const calcHackText = () => {
        const nextWord = jsHackText[nextWordIndex];
        if (nextWordIndex > jsHackText.length || nextWord == undefined) {
            setNextWordIndex(0);
            setHackText(" ")
        } else {
            if (nextWord) {
                setHackText(hackText + "\n" + nextWord);
                setNextWordIndex(nextWordIndex + 1)
            } else {
                setHackText(hackText + "\n");
                setNextWordIndex(nextWordIndex + 1);
            }
            if (preRef.current) {
                preRef.current.scrollTop = preRef.current.scrollHeight;
            }
        }
    }

    const handleClick = () => {
        calcHackText()
        setGame({...game, balance: game.balance + clickBonus});
    };

    function calcBonus(id: number) {
        const mileStones = Math.floor(game.upgrades[id] / 100);
        if (game.researches) {
            const boughtUpgrade = researchList.find(research => research.upgradeId === id && game.researches[research.id]);
            if (boughtUpgrade) {
                return Math.floor((game.upgrades[id] * UpgradeBonusList[id] + UpgradeMileStoneList[id] * mileStones) * boughtUpgrade.bonus);
            }
        }
        return Math.floor(game.upgrades[id] * UpgradeBonusList[id] + UpgradeMileStoneList[id] * mileStones);
    }

    useEffect(() => {
        const defaultUpgrades: Record<number, number> = {}
        defaultUpgrades[0] = 1
        defaultUpgrades[1] = 0
        defaultUpgrades[2] = 0
        defaultUpgrades[3] = 0
        defaultUpgrades[4] = 0
        defaultUpgrades[5] = 0
        defaultUpgrades[6] = 0
        defaultUpgrades[7] = 0
        defaultUpgrades[8] = 0
        defaultUpgrades[9] = 0

        const defaultResearchList: Record<number, boolean> = {}
        defaultResearchList[0] = false
        defaultResearchList[1] = false
        defaultResearchList[2] = false
        defaultResearchList[3] = false
        defaultResearchList[4] = false
        defaultResearchList[5] = false
        defaultResearchList[6] = false
        defaultResearchList[7] = false
        defaultResearchList[8] = false

        const data = localStorage.getItem('game')
        if (data) {
            const loadedData = JSON.parse(data)
            setGame({
                balance: loadedData.balance,
                upgrades: loadedData.upgrades,
                unlockedStocks: loadedData.unlockedStocks,
                unlockedRoulette: loadedData.unlockedRoulette,
                unlockedResearch: loadedData.unlockedResearch,
                researches: loadedData.researches,
                geekyCoins: loadedData.geekyCoins
            })
        } else {
            setGame({
                balance: game.balance,
                upgrades: defaultUpgrades,
                unlockedStocks: false,
                unlockedRoulette: false,
                unlockedResearch: false,
                researches: {},
                geekyCoins: 0
            });
        }
    }, []);

    useEffect(() => {
        if (incomeBonus > 0) {
            const interval = setInterval(() => {
                const currentGame = game
                setGame({...currentGame, balance: currentGame.balance + incomeBonus});
                calcHackText()
                setWobble(true)
            }, 1000)

            return () => clearInterval(interval);
        }
    }, [game, incomeBonus, setGame]);

    useEffect(() => {
        let clickBonus =
            calcBonus(0) +
            calcBonus(1) +
            calcBonus(2) +
            calcBonus(3) +
            calcBonus(4)
        if (game.geekyCoins > 0) {
            if (game.researches) {
                if (game.researches[8]) {
                    clickBonus = clickBonus * 5 * (1 + game.geekyCoins);
                } else {
                    clickBonus = clickBonus * (1 + game.geekyCoins);
                }
            }
        }
        setClickBonus(clickBonus);
        let incomeBonus =
            calcBonus(5) +
            calcBonus(6) +
            calcBonus(7) +
            calcBonus(8) +
            calcBonus(9)
        if (game.geekyCoins > 0) {
            if (game.researches) {
                if (game.researches[8]) {
                    incomeBonus = incomeBonus * 5 * (1 + game.geekyCoins);
                } else {
                    incomeBonus = incomeBonus * (1 + game.geekyCoins);
                }
            }
        }
        setIncomeBonus(Math.floor(incomeBonus))
    }, [game.upgrades, game.researches]);

    return (
        <>
            <Header/>
            <Box sx={{display: "flex", flexDirection: {xs: "column", lg: "row"}, height: "95vh"}}>
                <Container sx={{textAlign: 'center', width: {lg: "60%"}}}>
                    <Box sx={{border: '2px solid white', borderRadius: '8px', p: 2, mt: 2, mb: 3, position: 'relative'}}>
                        <Typography sx={{
                            position: 'absolute',
                            top: '-13px',
                            left: "1rem",
                            background: '#181818',
                            color: "white",
                            padding: '2px 8px',
                            borderRadius: '4px',
                        }}>
                            Guthaben
                        </Typography>
                        <BalanceComponent balance={game.balance}/>
                        {game.geekyCoins > 0 && <GeekyCoinsComponent geekyCoins={game.geekyCoins}/>}
                        <ActiveIncome activeIncome={clickBonus}/>
                        <PassiveIncome incomeBonus={incomeBonus}/>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <animated.img
                            style={{cursor: 'pointer', transform, userSelect: 'none', width: '40%', objectFit: "cover"}}
                            onClick={() => {
                                handleClick()
                                setWobble(true)
                            }}
                            draggable={false}
                            onAnimationEnd={() => setWobble(false)}
                            src={"clicker.png"}
                            alt="Logo"
                        />
                    </Box>
                    <Box
                        sx={{
                            backgroundColor: '#000',
                            color: '#0f0',
                            fontFamily: 'monospace',
                            padding: '10px',
                            mt: 2,
                            mb: 3,
                            borderRadius: '5px',
                            border: '2px solid #0f0',
                            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
                            position: 'relative',
                        }}
                    >
                        <pre ref={preRef} style={{textAlign: 'left', height: '400px', overflowY: 'auto'}}>
                            {hackText}
                        </pre>
                        <Divider color="green"></Divider>
                        <TextField
                            variant="outlined"
                            fullWidth
                            placeholder="Enter command..."
                            value={`> ${jsHackText[nextWordIndex] ? jsHackText[nextWordIndex].trim() : ""}`}
                            InputProps={{
                                readOnly: true,
                                style: {
                                    color: '#0f0',
                                },
                            }}
                        />
                    </Box>
                </Container>
                <Container
                    sx={{
                        width: {lg: "40%"},
                        textAlign: "center",
                        flex: "1",
                        display: "flex",
                        flexFlow: 'column'
                    }}
                >
                    <Box sx={{border: '2px solid white', borderRadius: '8px', p: 2, mt: 2, mb: 2, position: 'relative'}}>
                        <Typography sx={{
                            position: 'absolute',
                            top: '-13px',
                            left: "1rem",
                            background: '#181818',
                            color: "white",
                            padding: '2px 8px',
                            borderRadius: '4px'
                        }}>
                            {elementValueToName(displayedElement)}
                        </Typography>
                        <Grid container columns={{xs: 4, md: 12}}>
                            <Grid item xs={4} md={12}>
                                <Button sx={{m: 1, boxShadow: '0 3px 3px rgba(0, 0, 0, 0.5)'}} variant="contained"
                                        onClick={() => setDisplayedElement(0)}>Klick</Button>
                                <Button sx={{m: 1, boxShadow: '0 3px 3px rgba(0, 0, 0, 0.5)'}} variant="contained"
                                        onClick={() => setDisplayedElement(1)}>Einkommen</Button>
                                <Button sx={{m: 1, boxShadow: '0 3px 3px rgba(0, 0, 0, 0.5)'}} variant="contained"
                                        onClick={() => setDisplayedElement(2)}>Roulette</Button>
                                <Button sx={{m: 1, boxShadow: '0 3px 3px rgba(0, 0, 0, 0.5)'}} variant="contained"
                                        onClick={() => setDisplayedElement(3)}>Aktien</Button>
                                <Button sx={{m: 1, boxShadow: '0 3px 3px rgba(0, 0, 0, 0.5)'}} variant="contained"
                                        onClick={() => setDisplayedElement(4)}>Forschung</Button>
                            </Grid>
                        </Grid>
                        {(() => {
                            switch (displayedElement) {
                                case 0:
                                    return <ClickUpgradeList/>;
                                case 1:
                                    return <IncomeUpgradeList/>;
                                case 2:
                                    return <RouletteTable/>;
                                case 3:
                                    return <StocksTable/>;
                                default:
                                    return <ResearchList/>;
                            }
                        })()}
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default Home;
