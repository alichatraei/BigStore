import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material';
import IProduct from '../app/models/product'
import ProductCard from './ProductCard';
const Catalog = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    useEffect(() => {
        fetch("http://localhost:5000/api/products")
            .then((response) => response.json())
            .then((data) => setProducts(data));
    }, []);
    return (
        <Grid container spacing={2} mt={3}>
            {products && products.map((item, index) =>
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <ProductCard productItem={item} />
                </Grid>)}
        </Grid>
    )
}

export default Catalog
