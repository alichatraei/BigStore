import React from 'react'
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import IProduct from '../../app/models/product'
interface IProps {
    productItem: IProduct
}
const ProductCard = ({ productItem }: IProps) => {
    return (
        <Card>
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
                <Button size="small">مشاهده محصول</Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard
