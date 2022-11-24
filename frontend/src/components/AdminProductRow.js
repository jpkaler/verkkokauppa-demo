import { CTableRow, CButton, CTableDataCell } from '@coreui/react';

const AdminProductRow = (props) => {

    return (  

            <CTableRow className="justify-content-start" sm={{ gutterX: 3, gutterY: 6 }}>
                <CTableDataCell>{props.product.name}</CTableDataCell>
                <CTableDataCell>{props.product.price}€</CTableDataCell>
                <CTableDataCell>{props.product.category}</CTableDataCell>
                
                <CTableDataCell><CButton color="success" style={{padding:"1px 6px", margin:"2px 4px"}}
                    onClick={() => props.changeMode("edit", props.product.ID)}>Edit</CButton></CTableDataCell>
                <CTableDataCell><CButton color="danger" style={{padding:"1px 6px", margin:"2px 4px"}} 
                    onClick={() => props.changeMode("remove", props.product.ID)}>Remove</CButton></CTableDataCell>

            </CTableRow>


    )
}
export default AdminProductRow;