import React, { useEffect, useState } from 'react';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import agent from '../../app/api/agent';
import LoadingComponents from '../../app/layouts/LoadingComponents';
import { basket } from '../../app/models/basket';
import { Delete } from '@mui/icons-material';

const BasketPage = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [basket, setBasket] = useState<basket | null>(null);
    useEffect(() => {
        agent.basket.allItems().
            then((result) => setBasket(result))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [])
    if (loading) return <LoadingComponents message='لطفا منتظر بمانید...' />
    if (!basket) return <Typography variant="h3">سبد خرید شما خالی است</Typography>
    return (
        <TableContainer component={Paper} sx={{ margin: "23px 0" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align='center'>محصول</TableCell>
                        <TableCell align="center">قیمت واحد</TableCell>
                        <TableCell align="center">تعداد</TableCell>
                        <TableCell align="center">قیمت کل</TableCell>
                        <TableCell align="center">عملیات</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {basket.items.map((item) => (
                        <TableRow
                            key={item.productId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row" align='center'>
                                {item.name}
                            </TableCell>
                            <TableCell align="center">{(item.price / 1000).toFixed(3)}</TableCell>
                            <TableCell align="center">{item.quantity}</TableCell>
                            <TableCell align="center">{((item.price / 1000) * item.quantity).toFixed(3)}</TableCell>
                            <TableCell align="center">
                                <IconButton>
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>)
};

export default BasketPage;
