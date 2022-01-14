import React, { useState, useEffect } from 'react'
import { Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import IProduct from '../../app/models/product'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>()
    const [product, setProduct] = useState<IProduct | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        axios.get(`http://localhost:5000/api/Products/${id}`)
            .then((response) => setProduct(response.data))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [])
    if (loading) return (<Typography variant="h5">منتظر بمانید</Typography>)
    if (!product) return (<Typography variant="h5">هیچ محصولی یافت نشد</Typography>)
    return (
        <Grid container spacing={5} my={3}>
            <Grid item xs={12} md>
                <img src={product.pictureURL} alt={product.productName} style={{ width: "100%" }} />
            </Grid>
            <Grid item xs={12} md>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>نام محصول</TableCell>
                                <TableCell>{product.productName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>قیمت محصول</TableCell>
                                <TableCell>{(product.price)} تومان</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>توضیحات</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>برند</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>تعداد موجود در انبار</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}

export default ProductDetail
