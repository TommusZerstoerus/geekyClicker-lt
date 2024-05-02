import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {useGame} from "../context/GameContext.ts";
import {IconButton} from "@mui/material";
import {Info, Home} from "@mui/icons-material";
import {formatNumber} from "./Home/BalanceComponent.tsx";

const Header = () => {
    const {game, setGame} = useGame()

    function handleRestart(coins: number) {
        setGame({
            balance: 10,
            upgrades: {
                0: 1,
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
                9: 0
            },
            researches: {
                0: false,
                1: false,
                2: false,
                3: false,
                4: false,
                5: false,
                6: false,
                7: false,
                8: false
            },
            unlockedStocks: false,
            unlockedRoulette: false,
            unlockedResearch: false,
            geekyCoins: coins
        })
        localStorage.removeItem('game')
    }

    const showInfo = () => {
        withReactContent(Swal).fire({
            html: `<b>Spielprinzip</b> </br> Kaufe Klick Upgrades um dein Einkommen pro Klick zu erhöhen. Die passiven Einkommen Upgrades erhöhen dein Einkommen pro Sekunde, falls du mal nicht klicken möchtest. </br> </br> <b>Features</b> </br> Kaufe Aktien oder spiele Roulette um mit deinem Geld ein bisschen zu spielen. Forsche fleißig, damit deine Upgrades noch stärker werden! </br> </br> <b>Geeky Coins</b> </br> Setze deinen Spielstand zurück um GeekyCoins zu erhalten. Diese gewähren dir einen großen Bonus auf dein Einkommen!`,
            icon: 'info',
            confirmButtonText: 'Verstanden',
            confirmButtonColor: '#df742f',
            showConfirmButton: true,
        })
    }

    const showSaveSuccess = () => {
        withReactContent(Swal).fire({
            title: <i>Erfolgreich gespeichert</i>,
            icon: 'success',
            showConfirmButton: true,
        })
    }

    const showRestart = () => {
        withReactContent(Swal).fire({
            title: <i>Neustart</i>,
            text: 'Möchtest du wirklich neu starten? Du wirst alle Upgrades und dein Geld verlieren.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ja',
            cancelButtonText: 'Nein'
        }).then((result) => {
            if (result.isConfirmed) {
                handleRestart(0)
            }
        })
    }

    function handleGeekyCoins() {
        const availableCoins = Math.floor(game.balance / 1000000000)
        withReactContent(Swal).fire({
            title: <i>Neustart</i>,
            html: `Möchtest du deinen Stand zurück setzten und dein Geld in GeekyCoins umwandeln? </br> </br> Du würdest ${formatNumber(availableCoins)} Geekycoins erhalten`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Ja',
            cancelButtonText: 'Nein'
        }).then((result) => {
            if (result.isConfirmed) {
                handleRestart(game.geekyCoins + availableCoins)
            }
        })
    }

    function handleSave() {
        console.log('save', JSON.stringify(game));
        localStorage.setItem('game', JSON.stringify(game));
        showSaveSuccess()
    }

    const redirect = () => {
        window.location.href = 'https://www.progeek.de';
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar sx={{backgroundColor: '#909090'}}>
                    <IconButton onClick={redirect}><Home/></IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1, ml: 2}}>
                        Geeky Clicker
                    </Typography>
                    <IconButton sx={{mr: '20px'}} onClick={showInfo}><Info/></IconButton>
                    <Button sx={{mr: '20px'}} color="inherit" onClick={handleGeekyCoins}>GeekyCoins erhalten</Button>
                    <Button sx={{mr: '20px'}} color="inherit" onClick={handleSave}>Speichern</Button>
                    <Button color="inherit" onClick={showRestart}>Neustarten</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;