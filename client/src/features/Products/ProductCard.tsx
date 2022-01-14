import React from 'react'
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import IProduct from '../../app/models/product'
import { Link } from 'react-router-dom'
interface IProps {
    productItem: IProduct
}
const ProductCard = ({ productItem }: IProps) => {
    return (
        <Card sx={{ height: "100%", display: 'flex', flexDirection: 'column', justifyContent: "space-between" }}>
            <CardMedia
                component="img"
                // height="200"
                image={productItem.pictureURL}
                alt={productItem.productName} />
            <CardContent>
                <Typography gutterBottom variant="h6">
                    {productItem.productName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    برند: {productItem.brand}
                </Typography>
            </CardContent>
            <CardActions dir='ltr'>
                <Button size="small">اضافه کردن به سبد خرید</Button>
                <Button component={Link} to={`/product/${productItem.id}`} size="small">مشاهده محصول</Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard
