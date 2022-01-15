import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material';
import IProduct from '../../app/models/product';
import ProductCard from './ProductCard';
import agent from '../../app/api/agent';
const Catalog = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    useEffect(() => {
        agent.Product.allProducts().then(products => setProducts(products))
    }, []);
    return (
        <Grid container spacing={2} my={3}>
            {products && products.map((item, index) =>
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <ProductCard productItem={item} />
                </Grid>)}
        </Grid>
    )
}

export default Catalog
