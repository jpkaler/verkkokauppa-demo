import { CRow, CCol, CImage, CButton, CContainer, CTable, CTableHead, CTableHeaderCell, CTableRow, CTableBody, CTableDataCell } from '@coreui/react';
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
                <td><CButton color="success" style={{padding:"1px 6px", margin:"2px 4px"}}
                    onClick={() => props.changeMode("edit", props.ID)}>Edit</CButton></td>
                <td><CButton color="danger" style={{padding:"1px 6px", margin:"2px 4px"}} 
                    onClick={() => props.changeMode("remove", props.ID)}>Remove</CButton></td>
            </>
        )
    } else {
        linkRender = <td><Link to={`/${props.product.category}/${props.product.ID}`}>Tuotesivulle</Link></td>
    }

    return (  
            <CCol xs={{ cols:2, gutter: 2 }} lg={{ cols: 4, gutter: 2}}  >
                <div className="p-3 border border-dark">
                <CImage sm="xs" align="center" fluid src="/placeholder.jpg" />    
                    <CRow className="justify-content-center" xs={{ gutterX: 4, gutterY: 8 }}>
                    {props.product.name}
                    </CRow>
                    <CRow className="justify-content-center">
                    {props.product.price}€
                    </CRow>
                    <CButton onClick={onClick} name="addproduct" id="addproduct" color="secondary">
                        Lisää ostoskoriin
                    </CButton>
                    <CRow className="justify-content-center">
                    {linkRender}
                    {adminRender}
                    </CRow>
                </div>
            </CCol>
    )
}

export default ProductRow;