import React from 'react'
import IProduct from '../app/models/product'
interface Props {
    products: IProduct[];
}
const Catalog: React.FC<Props> = ({ products }) => {
    return (
        <>
            <ul>
                {products &&
                    products.map((item, index) => (
                        <li key={index}>{item?.productName} </li>
                    ))}
            </ul>
        </>
    )
}

export default Catalog
