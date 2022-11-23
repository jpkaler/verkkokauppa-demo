import { CFooter, CCol, CContainer, CRow } from "@coreui/react";
import { useEffect } from "react";
import CategoryBar from "./CategoryBar";
import ProductList from "./ProductList";

const HomePage = (props) => {

    useEffect(() => {
        props.setHomePageState();
    }, [])

    return (
        <CContainer fluid className="overflow-hidden min-vh-100"> 
                <CCol md="auto" className="category-bar">
                    <CategoryBar categories={props.categories} setCurrentCategory={props.setCurrentCategory}/>
                </CCol>
                <CCol md="8">
                </CCol>
        </CContainer>   
    )
}

export default HomePage;