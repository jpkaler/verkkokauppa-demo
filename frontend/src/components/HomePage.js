import { CCol, CContainer, CRow } from "@coreui/react";
import CategoryBar from "./CategoryBar";
import ProductList from "./ProductList";

const HomePage = (props) => {

    

    return (
        <CContainer>
            <CRow>
                <CCol><CategoryBar categories={props.categories} setCurrentCategory={props.setCurrentCategory}/></CCol>
                <CCol><ProductList products={props.products} error={props.error}/></CCol>
            </CRow>
            {console.log("Homepage renderöi")}
        </CContainer>
    )
}

export default HomePage;