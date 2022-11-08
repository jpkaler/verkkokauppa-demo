import CategoryBar from "./CategoryBar";
import ProductList from "./ProductList";
import { CFooter, CCol, CContainer, CRow } from "@coreui/react";


const CategoryPage = (props) => {

    

    return (
        <>
        <CContainer>
            <CRow>
                <CCol>
            <CategoryBar categories={props.categories} getProductsByCategory={props.getProductsByCategory} setCurrentCategory={props.setCurrentCategory}/>
            <ProductList products={props.products} setCart={props.setCart} cart={props.cart}/>
            </CCol>
            </CRow>
            <CFooter position="fixed">
                <span> 2022 Juho Kalermo & Riku Sänkiaho</span>
            </CFooter>
        </CContainer>
            
        </>
    )
}

export default CategoryPage;