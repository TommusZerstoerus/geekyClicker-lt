export type Game = {
    balance: number
    upgrades: Record<number, number>
    unlockedStocks: boolean
    unlockedRoulette: boolean
    unlockedResearch: boolean
    researches: Record<number, boolean>
}