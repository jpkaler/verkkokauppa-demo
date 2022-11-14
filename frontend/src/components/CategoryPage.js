import CategoryBar from "./CategoryBar";
import ProductList from "./ProductList";
import { CFooter, CCol, CContainer, CRow } from "@coreui/react";


const CategoryPage = (props) => {

    return (
        <>
        <CContainer fluid className="overflow-hidden min-vh-100">
            <CRow xs={{ gutterY: 3 }}>
                <CCol md="auto" class="border border-dark">
                <CategoryBar categories={props.categories} getProductsByCategory={props.getProductsByCategory} setCurrentCategory={props.setCurrentCategory}/>
                </CCol>
                <CCol md="auto">
                <ProductList products={props.products} setCart={props.setCart} cart={props.cart}/>
                </CCol>
            </CRow>
        </CContainer>
            
        </>
    )
}

export default CategoryPage;