import { CFooter, CCol, CContainer, CRow } from "@coreui/react";
import { useEffect } from "react";
import CategoryBar from "./CategoryBar";
import ProductList from "./ProductList";

const HomePage = (props) => {

    useEffect(() => {
        props.setHomePageState();
    }, [])

    return (
        <CContainer>
            <CRow>
                <CCol>
                    <CategoryBar categories={props.categories} setCurrentCategory={props.setCurrentCategory}/>
                </CCol>
                <CCol>
                    <ProductList products={props.products} error={props.error}/>
                </CCol>
            </CRow>
            <CFooter position="fixed">
                <span> 2022 Juho Kalermo & Riku Sänkiaho</span>
            </CFooter>
        </CContainer>
        
    )
}

export default HomePage;