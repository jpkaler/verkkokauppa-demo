import { useEffect, useState } from 'react';
import SearchBar from "./SearchBar";
import ProductList from "./ProductList";

const SearchPage = (props) => {

    const [state, setState] = useState({
        search:"",
        products:[]
    })

    // Muokkaa search-statea 
    const setSearch = (search) => {
        setState((state) => {
            return {
                ...state,
                search:search
            }      
        });
    }

    // Muokkaa tuotelistaa hakukentän muutoksesta
    useEffect(() => {
        let tempProducts = props.products.filter((product) => {
            return product.name.includes(state.search)
        });
        console.log("SearchPage renderöi")
        setState((state) => {
            return {
                ...state,
                products:tempProducts
            }
        })
    }, [state.search])

    return (
        <div>
            <SearchBar setSearch={setSearch} />
            <ProductList products={state.products} />
        </div>
    )
}

export default SearchPage;