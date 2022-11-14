import { CContainer, CRow, CCol } from "@coreui/react";
import ProductList from "./ProductList";
import CategoryBar from "./CategoryBar";

const SearchPage = (props) => {

    return (
        <CContainer fluid className="overflow-hidden min-vh-100">
            <CRow xs={{ gutterY: 3 }}> 
                <CCol md="auto" class="border border-dark">
                    <CategoryBar categories={props.categories} setCurrentCategory={props.setCurrentCategory}/>
                </CCol>
                <CCol md="auto" >
                    <ProductList products={props.products} error={props.error} setCart={props.setCart} cart={props.cart} />
                </CCol>
            </CRow>
        </CContainer>
    )
}

export default SearchPage;