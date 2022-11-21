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
            <CRow xs={{ gutterY: 3 }}>
                <CCol md="auto">
                    <CategoryBar categories={props.categories} setCurrentCategory={props.setCurrentCategory}/>
                </CCol>
                <CCol md="8">
                </CCol>
            </CRow>
        </CContainer>
        
    )
}

export default HomePage;