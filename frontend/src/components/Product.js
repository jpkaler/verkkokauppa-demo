import { useState } from 'react';

const Product = (props) => {

    /* const [state, setState] = useState({
        id:props.id,
        name:props.name,
        price:props.price,
        category:props.category
    }) */

    return (
        <ul>
            <li>Nimi: {props.name}</li>
            <li>Hinta: {props.price}</li>
            <li>Kategoria: {props.category}</li>
        </ul>
    )
}

export default Product;