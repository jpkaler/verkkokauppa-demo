import { CContainer, CRow, CCol } from "@coreui/react";
import ProductList from "./ProductList";
import CategoryBar from "./CategoryBar";

const SearchPage = (props) => {

    return (
        <CContainer fluid className="overflow-hidden min-vh-100">
                <CCol md="auto" className="category-bar">
                    <CategoryBar categories={props.categories} setCurrentCategory={props.setCurrentCategory}/>
                </CCol>
            <CRow xs={{ gutterY: 3 }} className="justify-content-center p-2"> 
                <CCol md="10" >
                    <ProductList products={props.products} error={props.error} setCart={props.setCart} cart={props.cart} />
                </CCol>
            </CRow>
        </CContainer>
    )
}

export default SearchPage;