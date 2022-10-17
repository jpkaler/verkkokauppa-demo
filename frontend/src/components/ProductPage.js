import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProductPage = (props) => {
    
    const [state, setState] = useState({
        product: {
            ID:0,
            name:"jee",
            price:0.00,
            category:"joo"
        }
    })

    const { productId } = useParams();
    console.log("product page renderöi");

    useEffect(() => {
        let tempProduct = props.products.find((product) => product.ID === parseInt(productId));
        if (tempProduct) {
            console.log("tempProduct:",tempProduct);
            setState({product: tempProduct});
        }
    }, [productId])
    

    return (
        <div>
            <h3>Tuote </h3>
            <p>Tuotteen id: {state.product.ID}</p>
            <p>Tuotteen nimi: {state.product.name}</p>
            <p>Tuotteen hinta: {state.product.price}</p>
            <p>Tuotteen kategoria: {state.product.category}</p>
            <p><Link to="/">Etusivulle</Link></p>
        </div>
    )
};

export default ProductPage;