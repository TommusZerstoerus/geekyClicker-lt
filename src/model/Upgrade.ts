export type Upgrade = {
    id: number
    userID: number
    upgradeID: number
    level: number
}

export enum UpgradeType {
    CLICK = "CLICK",
    INCOME = "INCOME"
}