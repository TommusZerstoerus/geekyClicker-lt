import Box from "@mui/material/Box";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import StocksCell from "./StocksCell.tsx";
import {stocks} from "../../model/StockList.ts";
import Button from "@mui/material/Button";
import {ShoppingCart} from "@mui/icons-material";
import {formatNumber} from "../Home/BalanceComponent.tsx";
import {useGame} from "../../context/GameContext.ts";

export type Stock = {
    id: number,
    name: string,
    price: number,
}

const StocksTable = () => {
    const {game, setGame} = useGame()

    const unlockStocks = () => {
        setGame({...game, unlockedStocks: true, balance: game.balance - 100000})
    }

    if (!game.unlockedStocks) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                m: 2
            }}>
                <Button sx={{mt: 3, width: '60%'}} disabled={game.balance <= 100000} startIcon={<ShoppingCart/>}
                        variant="contained" color="secondary" onClick={unlockStocks}>
                    Schalte Aktien frei ({formatNumber(100000)}€)
                </Button>
            </Box>
        );
    } else {
        return (
            <Box sx={{
                width: '95%',
                mt: 3,
                p: 2,
                bgcolor: "lightgray",
                borderRadius: {lg: 5, xs: 3},
            }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Aktie</TableCell>
                            <TableCell>Preis</TableCell>
                            <TableCell>Kauf/Verkauf</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stocks.map((stock) => (
                            <StocksCell key={stock.id} stock={stock}/>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        )
    }
}

export default StocksTable