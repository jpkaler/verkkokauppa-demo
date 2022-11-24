import { CRow, CCol, CImage, CButton, CTableDataCell } from '@coreui/react';
import { Link } from 'react-router-dom';

const ProductRow = (props) => {

    // onClick ostoskoriin lisäämiseksi
    const onClick = (event) => {
        let tempCart = [...props.cart];
        // Jos tuote on jo korissa, splice -> lisää määrään yhden
        for (const product of tempCart) {
            if (product.ID === props.product.ID) {
                product.quantity++;
                props.setCart(tempCart);
                return;        
            }
        }

        tempCart.push({...props.product, quantity: 1});
        props.setCart(tempCart);
    }

    // Button rendering for admin page
    let adminRender = <></>
    let linkRender = <></>

    // Tuotteita voi muokata / poistaa jos haku toteutetaan admin-sivulta
    if (props.admin) {
        adminRender = (
            <>
                <CTableDataCell><CButton color="success" style={{padding:"1px 6px", margin:"2px 4px"}}
                    onClick={() => props.changeMode("edit", props.ID)}>Edit</CButton></CTableDataCell>
                <CTableDataCell><CButton color="danger" style={{padding:"1px 6px", margin:"2px 4px"}} 
                    onClick={() => props.changeMode("remove", props.ID)}>Remove</CButton></CTableDataCell>
            </>
        )
    }

    return (  
            <CCol>
                <div className="product-row p-3 ">
                    <Link to={`/${props.product.category}/${props.product.ID}`}>
                    <CImage sm="auto" lg="auto" align="center" fluid src="/placeholder.jpg" />   
                    <CRow className="justify-content-start" sm={{ gutterX: 3, gutterY: 6 }}>
                    {props.product.name}
                    </CRow>
                    </Link> 
                    <CRow className="justify-content-start desc-text">
                    {props.product.price}€
                    </CRow>
                    <CRow>
                    <CButton onClick={onClick} name="addproduct" id="addproduct">
                        Lisää ostoskoriin
                    </CButton>
                    </CRow>
                    <CRow className="justify-content-center">
                    {adminRender}
                    </CRow>
                </div>
            </CCol>
    )
}
export default ProductRow;