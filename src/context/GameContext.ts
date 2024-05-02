import React, {createContext, useContext} from 'react';
import {Game} from "../model/Game.ts";

const initialGameState: Game = {
    geekyCoins: 0,
    researches: {},
    unlockedResearch: false,
    unlockedRoulette: false,
    balance: 0,
    upgrades: {},
    unlockedStocks: false
};

export const GameContext = createContext<{
    game: Game;
    setGame: React.Dispatch<React.SetStateAction<Game>>;
}>({
    game: initialGameState,
    setGame: (newGame) => {
        // @ts-ignore
        this.game = newGame
    },
});

const useGame = () => useContext(GameContext);

export {useGame};