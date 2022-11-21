import CategoryBar from "./CategoryBar";
import ProductList from "./ProductList";
import { CFooter, CCol, CContainer, CRow } from "@coreui/react";


const CategoryPage = (props) => {

    return (
        <>
        <CContainer fluid className="overflow-hidden min-vh-100">
            <CCol md="auto" className="category-bar" >
                <CategoryBar categories={props.categories} getProductsByCategory={props.getProductsByCategory} setCurrentCategory={props.setCurrentCategory}/>
            </CCol>
            <CRow className="justify-content-center p-2">
                <CCol md="10">
                    <ProductList products={props.products} setCart={props.setCart} cart={props.cart}/>
                </CCol>
            </CRow>
        </CContainer>
            
        </>
    )
}

export default CategoryPage;