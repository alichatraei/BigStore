import React, { useState, useEffect } from 'react'
import { Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from '@mui/material'
import IProduct from '../../app/models/product'
import { useParams } from 'react-router-dom'
import agent from '../../app/api/agent'
import NotFoundComponent from '../../error/NotFoundComponent'
import LoadingComponents from '../../app/layouts/LoadingComponents'
import { useStoreContext } from '../../context/StoreContext'
import { LoadingButton } from '@mui/lab'

const ProductDetail = () => {
    const { basket } = useStoreContext()
    const { id } = useParams<{ id: string }>()
    const [product, setProduct] = useState<IProduct | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [quantity, setQuantity] = useState(0)
    const [updateIndicator, setUpdateIndicator] = useState(false)
    const item = basket?.items.find(item => item.productId === product?.id);
    useEffect(() => {
        item && setQuantity(item.quantity)
        id && agent.Product.customProduct(parseInt(id))
            .then(product => setProduct(product))
            .catch()
            .finally(() => setLoading(false))
    }, [id, item])
    if (loading) return (<LoadingComponents message='در حال بارگذاری محصول...' />)
    if (!product) return (<NotFoundComponent />)
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
                <Grid container spacing={2} mt={3}>
                    <Grid item xs={6}>
                        <TextField type="number" variant='outlined' label="تعداد موجود در سبد خرید" fullWidth
                            value={quantity} size="small" />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton color="primary"
                            variant="contained"
                            fullWidth
                            sx={{ padding: '8px' }}>
                            {item ? "بروز کردن سبد خرید" : "اضافه کردن به سبد خرید"}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ProductDetail
