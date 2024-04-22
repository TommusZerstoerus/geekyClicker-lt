import {Container} from "@mui/material";
import Header from "../components/Header.tsx";
import ClickUpgradeList from "../components/ClickUpgradeList.tsx";
import IncomeUpgradeList from "../components/IncomeUpgradeList.tsx";
import {useClient} from "../context/ClientContext.ts";
import Box from "@mui/material/Box";
import icon from "../assets/icon.svg";
import {useEffect, useState} from "react";
import {useGame} from "../context/GameContext.ts";
import BalanceComponent, {formatNumber} from "../components/BalanceComponent.tsx";
import {UpgradeBonusList, UpgradeMileStoneList} from "../model/UpgradeList.ts";
import {animated, useSpring} from '@react-spring/web'
import StocksTable from "../components/Stocks/StocksTable.tsx";
import Button from "@mui/material/Button";
import {ShoppingCart} from "@mui/icons-material";
import PassiveIncome from "../components/Home/PassiveIncome.tsx";
import ActiveIncome from "../components/Home/ActiveIncome.tsx";
import RouletteTable from "../components/Roulette/Roulette.tsx";

const Home = () => {
    const [clickBonus, setClickBonus] = useState(0);
    const [incomeBonus, setIncomeBonus] = useState(0);
    const [wobble, setWobble] = useState(false)
    const {game, setGame} = useGame()

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

    const handleClick = () => {
        setGame({...game, balance: game.balance + clickBonus});
    };

    const unlockStocks = () => {
        setGame({...game, unlockedStocks: true, balance: game.balance - 100000})
    }

    const unlockRoulette = () => {
        setGame({...game, unlockedRoulette: true, balance: game.balance - 10000})
    }

    function calcBonus(id: number) {
        const mileStones = Math.floor(game.upgrades[id] / 100)
        return Math.floor(game.upgrades[id] * UpgradeBonusList[id] + UpgradeMileStoneList[id] * mileStones)
    }

    useEffect(() => {
            const savedUpgrades: Record<number, number> = {}
            savedUpgrades[0] = 1
            savedUpgrades[1] = 0
            savedUpgrades[2] = 0
            savedUpgrades[3] = 0
            savedUpgrades[4] = 0
            savedUpgrades[5] = 0
            savedUpgrades[6] = 0
            savedUpgrades[7] = 0
            savedUpgrades[8] = 0
            savedUpgrades[9] = 0

            const loadedData = JSON.parse(localStorage.getItem('game'))
            if (loadedData) {
                setGame({
                    balance: loadedData.balance,
                    upgrades: loadedData.upgrades,
                    unlockedStocks: loadedData.unlockedStocks,
                    unlockedRoulette: loadedData.unlockedRoulette
                })
            } else {
                setGame({
                    balance: game.balance,
                    upgrades: savedUpgrades,
                    unlockedStocks: false,
                    unlockedRoulette: false
                });
            }
    }, []);

    useEffect(() => {
        if (incomeBonus > 0) {
            const interval = setInterval(() => {
                const currentGame = game
                setGame({...currentGame, balance: currentGame.balance + incomeBonus});
                setWobble(true)
            }, 1000)

            return () => clearInterval(interval);
        }
    }, [game, incomeBonus, setGame]);

    useEffect(() => {
        const clickBonus =
            calcBonus(0) +
            calcBonus(1) +
            calcBonus(2) +
            calcBonus(3) +
            calcBonus(4)
        setClickBonus(clickBonus);
        const incomeBonus =
            calcBonus(5) +
            calcBonus(6) +
            calcBonus(7) +
            calcBonus(8) +
            calcBonus(9)
        setIncomeBonus(Math.floor(incomeBonus))
    }, [game.upgrades]);

    return (
        <>
            <Header/>
            <Box sx={{display: "flex", justifyContent: "center", flexWrap: "wrap"}}>
                <Container sx={{
                    maxWidth: "100%",
                    textAlign: "center",
                    flex: "1",
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: '20px',
                    order: {lg: 2, xs: 1}
                }}>
                    <Container sx={{maxWidth: "100%", textAlign: 'center', width: "100%"}}>
                        <Box p={2}>
                            <BalanceComponent balance={game.balance}/>
                            <ActiveIncome activeIncome={clickBonus}/>
                            <PassiveIncome incomeBonus={incomeBonus}/>
                            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                                <animated.img
                                    style={{cursor: 'pointer', transform, userSelect: 'none', width: '40%'}}
                                    onClick={() => {
                                        handleClick()
                                        setWobble(true)
                                    }}
                                    draggable={false}
                                    onAnimationEnd={() => setWobble(false)}
                                    src={icon}
                                    alt="Logo"
                                />
                            </Box>
                            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                {game.unlockedRoulette && <RouletteTable/>}
                                {!game.unlockedRoulette &&
                                    <Button sx={{mt: 5, width: '50%'}} disabled={game.balance <= 10000} startIcon={<ShoppingCart/>}
                                            variant="contained" color="secondary" onClick={unlockRoulette}>Schalte
                                        Roulette frei
                                        ({formatNumber(10000)}€)</Button>}
                                {game.unlockedStocks && <StocksTable/>}
                                {!game.unlockedStocks &&
                                    <Button sx={{mt: 5, width: '50%'}} disabled={game.balance <= 100000} startIcon={<ShoppingCart/>}
                                            variant="contained" color="secondary" onClick={unlockStocks}>Schalte Aktien
                                        frei
                                        ({formatNumber(100000)}€)</Button>}
                            </Box>
                        </Box>
                    </Container>
                </Container>
                <ClickUpgradeList/>
                <IncomeUpgradeList/>
            </Box>
        </>
    );
};

export default Home;