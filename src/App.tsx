import {useState} from "react";
import Home from "./pages/Home.tsx";
import {GameContext} from "./context/GameContext.ts";
import {theme} from "./themes/theme.ts";
import {ThemeProvider} from "@mui/material";
import './App.css';
import ResearchProvider from "./context/ResearchContext.tsx";

function App() {


    const [game, setGame] = useState({
        balance: 10,
        upgrades: {},
        unlockedStocks: false,
        unlockedRoulette: false,
        unlockedResearch: false,
        researches: {}
    });

    return (
        <ThemeProvider theme={theme}>
            <GameContext.Provider value={{game, setGame}}>
                <ResearchProvider>
                    <Home/>
                </ResearchProvider>
            </GameContext.Provider>
        </ThemeProvider>
    )
}

export default App
