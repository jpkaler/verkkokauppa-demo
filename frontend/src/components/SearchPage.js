import { CContainer, CRow, CCol } from "@coreui/react";
import ProductList from "./ProductList";
import CategoryBar from "./CategoryBar";

const SearchPage = (props) => {

    return (
        <CContainer>
            <CRow>
                <CCol><CategoryBar categories={props.categories} setCurrentCategory={props.setCurrentCategory}/></CCol>
                <CCol><ProductList products={props.products} error={props.error} setCart={props.setCart} cart={props.cart} /></CCol>
            </CRow>
        </CContainer>
    )
}

export default SearchPage;