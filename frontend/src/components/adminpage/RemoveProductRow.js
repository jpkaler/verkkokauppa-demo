import { CButton, CTableDataCell, CTableRow } from "@coreui/react";

const RemoveProductRow = (props) => {

    return (
        <CTableRow>
            <CTableDataCell>{props.product.name}</CTableDataCell>
            <CTableDataCell>{props.product.price}€</CTableDataCell>
            <CTableDataCell>{props.product.category}</CTableDataCell>
            <CTableDataCell><CButton color="danger" onClick={() => props.changeMode("cancel")}>Cancel</CButton></CTableDataCell>
            <CTableDataCell><CButton color="success" onClick={() => props.removeProduct(props.product.ID)}>Confirm</CButton></CTableDataCell>
        </CTableRow>
    )
}

export default RemoveProductRow;