import { CButton } from "@coreui/react";

const RemoveProductRow = (props) => {

    return (
        <tr>
            <td>{props.product.name}</td>
            <td>{props.product.price}</td>
            <td>{props.product.category}</td>
            <td><CButton color="danger" onClick={() => props.changeMode("cancel")}>Cancel</CButton></td>
            <td><CButton color="success" onClick={() => props.removeProduct(props.product.ID)}>Confirm</CButton></td>
        </tr>
    )
}

export default RemoveProductRow;