import { useEffect, useState } from 'react';
import ProductList from "./ProductList";

const SearchPage = (props) => {

    const [state, setState] = useState({
        products:[]
    })

    // Muokkaa tuotelistaa hakukentän muutoksesta
    useEffect(() => {
        let tempProducts = props.products.filter((product) => {
            return product.name.includes(props.search)
        });
        console.log("SearchPage renderöi")
        setState((state) => {
            return {
                ...state,
                products:tempProducts
            }
        })
    }, [props.search])

    return (
        <div>
            <ProductList products={state.products} />
        </div>
    )
}

export default SearchPage;