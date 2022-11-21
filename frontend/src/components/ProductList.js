import ProductRow from './ProductRow';
import { CTable, CTableHead, CTableHeaderCell, CTableRow, CTableBody, CTableDataCell, CContainer, CRow } from "@coreui/react";

/* 
const UP_ARROW = '&#8593;';
const DOWN_ARROW = '&#8595;';
 */
const ProductList = (props) => {


    // Muokkaa products-listan Product-komponenteiksi
    let products = props.products.map((product) => {
        return <ProductRow key={product.ID} product={product} setCart={props.setCart} cart={props.cart} />
    })

    return (
        <CContainer fluid>
            <CRow xs={{ gutterY: 2, cols: 3 }} lg={{ gutterY: 2, cols: 4 }} xl={{ gutterY: 2, cols: 5 }} >
                {products}
            </CRow>
        </CContainer>
    )
}

export default ProductList;