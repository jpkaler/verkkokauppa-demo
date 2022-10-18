import { useState } from 'react';
import Product from './Product';

const UP_ARROW = '&#8593;';
const DOWN_ARROW = '&#8595;';

const ProductList = (props) => {

    const [state, setState] = useState({
        name: -1,
        price: -1,
        category: -1,
        active: ""
    })

    // Funktio, joka järjestää listan orderpainallusten perusteella
    const sortList = () => {
        let tempList = props.products.slice();
        if (state[state.active] === 1) {
            return tempList.sort((a,b) => a[state.active] - b[state.active]);
        } else {
            return tempList.sort().reverse()
        }
    }

    const onClick = (event) => {
        // Järjestää sarakkeen kasvavaan järjestykseen, jos sarakkeen järjestys on laskeva tai default
        let oppositeOrder = (state[event.target.name] === -1 ? 1 : -1);
        setState((state) => {
            return {
                ...state,
                [event.target.name]: oppositeOrder,
                active: event.target.name
            }
        })
    }

    // Muokkaa products-listan Product-komponenteiksi
    let products =  props.products.map((product) => {
        return <Product key={product.ID} ID={product.ID} name={product.name} price={product.price} category={product.category} />
    })
  
    return (
        <table>
            <thead>
                <tr>
                    <th><button id="name" name="name" onClick={onClick}>Nimi</button></th>
                    <th><button id="price" name="price" onClick={onClick}>Hinta</button></th>
                    <th><button id="category" name="category" onClick={onClick}>Kategoria</button></th>
                </tr>
            </thead>
            <tbody>
                {products}
            </tbody>
        </table>
    )
}

export default ProductList;