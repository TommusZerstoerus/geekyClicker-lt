import {useEffect, useState} from "react";
import {Button, Container, FormControlLabel, LinearProgress, Stack, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {useGame} from "../context/GameContext.ts";
import {ShoppingCart} from "@mui/icons-material";
import {IOSSwitch} from "./IOSSwitch.tsx";
import {BasePriceList, UpgradeBonusList, UpgradeMileStoneList} from "../model/UpgradeList.ts";
import {researchList} from "../model/ResearchList.ts";
import {UpgradeType} from "../model/Upgrade.ts";
import {formatNumber} from "./Home/BalanceComponent.tsx";

type ClickUpgradeProps = {
    id: number,
    name: string,
    type: UpgradeType
}

const UpgradeBox = ({id, name, type}: ClickUpgradeProps) => {
    const basePrice = BasePriceList[id]
    const [upgradePrice, setUpgradePrice] = useState(basePrice);
    const [tenTimes, setTenTimes] = useState(false);
    const [researchUpgrade, setResearchUpgrade] = useState(false);
    const [upgradeBonus, setUpgradeBonus] = useState(UpgradeBonusList[id]);
    const {game, setGame} = useGame()

    const balance = game.balance
    const level = game.upgrades[id]
    const upgradePriceText = formatNumber(upgradePrice);

    const [oldValue, setOldValue] = useState(Math.floor(level / 100))
    const [animateBar, setAnimateBar] = useState(false)

    function calcUpgradePrice() {
        if (tenTimes) {
            setUpgradePrice(calc10Price());
        } else {
            if (level === 0) {
                setUpgradePrice(basePrice)
            } else {
                setUpgradePrice(basePrice * level);
            }
        }
    }

    function calc10Price() {
        return Array.from({length: 10}, (_, i) =>
            (level + i) * basePrice
        ).reduce((sum, current) => sum + current, 0)
    }

    function buyUpgrade() {
        tenTimes ? setGame({
            ...game,
            balance: balance - upgradePrice,
            upgrades: {...game.upgrades, [id]: level + 10}
        }) : setGame({
            ...game,
            balance: balance - upgradePrice,
            upgrades: {...game.upgrades, [id]: level + 1}
        })
    }

    useEffect(() => {
        setUpgradePrice(basePrice)
        calcUpgradePrice()
        setOldValue(Math.floor(level / 100))
    }, [level, tenTimes]);

    const newValue = Math.floor(level / 100)
    if (newValue > oldValue) {
        setAnimateBar(true)
        setOldValue(newValue)
    }

    useEffect(() => {
        if (game.researches) {
            const boughtUpgrade = researchList.find(research => research.upgradeId === id && game.researches[research.id]);
            if (boughtUpgrade) {
                setResearchUpgrade(true)
                setUpgradeBonus(UpgradeBonusList[id] * boughtUpgrade.bonus)
            } else {
                setResearchUpgrade(false)
                setUpgradeBonus(UpgradeBonusList[id])
            }
        }
    }, [game.researches]);

    const adjustedUpgradeBonus = tenTimes ? formatNumber(upgradeBonus * 10) : formatNumber(upgradeBonus);

    return (
        <Container maxWidth="lg" style={{textAlign: "center"}}>
            <Box
                borderRadius={8}
                boxShadow={3}
                p={2}
                sx={{
                    background: 'black',
                    display: 'flex',
                    color: '#49da3a',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #49da3a',
                }}
            >
                <Typography variant="body1">
                    {name}
                </Typography>
                <Typography variant="body2" color={researchUpgrade ? "gold" : ""}>
                    {type === UpgradeType.CLICK ? `(+${adjustedUpgradeBonus}€)` : `(+${adjustedUpgradeBonus}€/s)`}
                </Typography>
                <Typography variant="body2">
                    Stufe {level}
                </Typography>
                {balance >= upgradePrice ?
                    <Button startIcon={<ShoppingCart/>} variant="contained"
                            onClick={buyUpgrade}>{upgradePriceText}€</Button> :
                    <Button startIcon={<ShoppingCart/>} variant="contained"
                            disabled>{upgradePriceText}€</Button>}
                <Stack marginTop={'10px'} direction="row" spacing={1} alignItems="center">
                    <Typography>1x</Typography>
                    <FormControlLabel
                        onChange={() => {
                            setTenTimes(!tenTimes)
                        }}
                        control={<IOSSwitch sx={{m: 1}} defaultChecked={false}/>}
                        label={""}/>
                    <Typography>10x</Typography>
                </Stack>
                <Box
                    sx={{
                        width: '100%',
                    }}
                >
                    <LinearProgress
                        color={"secondary"}
                        className={animateBar ? "animate-bar" : ""}
                        onAnimationEnd={() => setAnimateBar(false)}
                        variant="determinate"
                        value={level % 100}
                    />
                    <Typography variant="body2">{level % 100} / 100  {type === UpgradeType.CLICK ? `(+${formatNumber(UpgradeMileStoneList[id])}€)` : `(+${formatNumber(UpgradeMileStoneList[id])}€/s)`}</Typography>
                </Box>
            </Box>
        </Container>
    )
}

export default UpgradeBox;