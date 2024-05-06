import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {useGame} from "../context/GameContext.ts";
import {Divider, IconButton, SwipeableDrawer, useMediaQuery} from "@mui/material";
import {formatNumber} from "./Home/BalanceComponent.tsx";
import {useState} from "react";
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import SaveIcon from '@mui/icons-material/Save';
import RefreshIcon from '@mui/icons-material/Refresh';
import MenuIcon from '@mui/icons-material/Menu';
import PaidIcon from '@mui/icons-material/Paid';

const Header = () => {
    const {game, setGame} = useGame()
    const [menuOpen, setMenuOpen] = useState(false);
    const isXsScreen = useMediaQuery('(max-width:600px)');

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

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
            {!isXsScreen && <AppBar position="static">
                <Toolbar sx={{backgroundColor: '#909090'}}>
                    <IconButton onClick={redirect}><HomeIcon/></IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1, ml: 2}}>
                        Geeky Clicker
                    </Typography>
                    <IconButton sx={{mr: '20px'}} onClick={showInfo}><InfoIcon/></IconButton>
                    <Button sx={{mr: '20px'}} color="inherit" onClick={handleGeekyCoins}>GeekyCoins erhalten</Button>
                    <Button sx={{mr: '20px'}} color="inherit" onClick={handleSave}>Speichern</Button>
                    <Button color="inherit" onClick={showRestart}>Neustarten</Button>
                </Toolbar>
            </AppBar>}
            {isXsScreen &&
                <>
                    <AppBar position="static">
                        <Toolbar sx={{backgroundColor: '#909090'}}>
                            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                Geeky Clicker
                            </Typography>
                            <IconButton onClick={toggleMenu} sx={{mr: 2}}>
                                <MenuIcon/>
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <SwipeableDrawer anchor={"right"} open={menuOpen} onOpen={toggleMenu} onClose={toggleMenu}>
                        <Box
                            sx={{width: 170}}
                            role="presentation"
                            onClick={toggleMenu}
                            onKeyDown={toggleMenu}
                        >
                            <IconButton onClick={toggleMenu}><MenuIcon/></IconButton>
                            <Divider/>
                            <Button color="inherit" onClick={redirect} startIcon={<HomeIcon/>}>Zu Progeek</Button>
                            <Button color="inherit" onClick={showInfo} startIcon={<InfoIcon/>}>Informationen</Button>
                            <Button color="inherit" onClick={handleGeekyCoins}
                                    startIcon={<PaidIcon/>}>GeekyCoins</Button>
                            <Button color="inherit" onClick={handleSave} startIcon={<SaveIcon/>}>Speichern</Button>
                            <Button color="inherit" onClick={showRestart} startIcon={<RefreshIcon/>}>Neustarten</Button>
                        </Box>
                    </SwipeableDrawer>
                </>
            }
        </Box>
    );
}

export default Header;