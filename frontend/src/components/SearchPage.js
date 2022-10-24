import { useEffect, useState } from 'react';
import ProductList from "./ProductList";
import { CContainer, CRow, CCol } from '@coreui/react';

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
        <CContainer>
        <CRow>

        <CCol md="auto">
            <ProductList products={state.products} />
        </CCol>

        </CRow>
        </CContainer>
    )
}

export default SearchPage;