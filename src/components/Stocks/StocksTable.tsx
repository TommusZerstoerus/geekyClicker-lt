import Box from "@mui/material/Box";
import {Collapse, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import StocksCell from "./StocksCell.tsx";
import {stocks} from "../../model/StockList.ts";
import {useState} from "react";
import Button from "@mui/material/Button";

export type Stock = {
    id: number,
    name: string,
    price: number,
}

const StocksTable = () => {
    const [open, setOpen] = useState(true);
    return (
        <Box sx={{
            width: '95%',
            mt: 3,
            p: 2,
            bgcolor: "lightgray",
            borderRadius: {lg: 5, xs: 3},
        }}>
            <Button onClick={() => setOpen(!open)} variant="contained" color="primary" sx={{mb: 2}}>
                {open ? 'Aktien Zuklappen' : 'Aktien'}
            </Button>
            <Collapse in={open}  sx={{
                width: '100%',
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
            </Collapse>
        </Box>
    )
}

export default StocksTable