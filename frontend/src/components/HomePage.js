import { CCol, CContainer, CRow } from "@coreui/react";
import CategoryBar from "./CategoryBar";
import ProductList from "./ProductList";

const HomePage = (props) => {

    const editCategory = (category) => {
        if (props.categories.includes(category)) {
            let tempCategories = [...props.categories];
            tempCategories.splice(tempCategories.indexOf(category), 1);
            props.setCategories(tempCategories);
        } else {
            let tempCategories = [...props.categories, category];
            props.setCategories(tempCategories);
        }        
    } 


    let products;
    if (props.categories.length !== 0) {
        products = props.products.filter((product) => props.categories.includes(product.category));
    } else {
        products = props.products;
    }

    return (
        <CContainer>
            <CRow>
                <CCol><CategoryBar editCategory={editCategory} searchProducts={props.searchProducts}/></CCol>
                <CCol><ProductList products={products} error={props.error}/></CCol>
            </CRow>
        </CContainer>
    )
}

export default HomePage;