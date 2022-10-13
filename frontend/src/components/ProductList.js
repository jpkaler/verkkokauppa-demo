import { useState } from 'react';
import Product from './Product';

const ProductList = (props) => {

    /* const [state, setState] = useState([]) */

    let products = props.products.map((product) => {
        return <Product key={product.ID} name={product.NIMI} price={product.HINTA} category={product.KATEGORIA} />
    })

    return (
        <table>
            <thead>
                <th>Nimi</th>
                <th>Hinta</th>
                <th>Kategoria</th>
            </thead>
            <tbody>
                {products}
            </tbody>
        </table>
    )
}

export default ProductList;