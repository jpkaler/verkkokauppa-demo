import { CButton, CFormInput, CTableDataCell, CTableRow } from "@coreui/react";
import { useState } from 'react';

const EditProductRow = (props) => {

    const [state, setState] = useState({
        name:props.product.name,
        price:props.product.price,
        category:props.product.category
    })

    const onChange = (event) => {
        setState((state) => {
            return {
                ...state,
                [event.target.name]:event.target.value
            }
        })
    }

    const onClick = (event) => {
        let product = {
            ...state
        }
        props.editProduct(props.product.ID, product);

    }

    return (
        <CTableRow>
            <CTableDataCell>
                <CFormInput type="text"
                        name="name"
                        id="name"
                        onChange={onChange}
                        value={state.name}
                />
            </CTableDataCell>
            <CTableDataCell>
            <CFormInput type="number"
                    name="price"
                    id="price"
                    onChange={onChange}
                    value={state.price}
            />
            </CTableDataCell>
            <CTableDataCell>
                <CFormInput type="text"
                        name="category"
                        id="category"
                        onChange={onChange}
                        value={state.category}
                />
            </CTableDataCell>
            <CTableDataCell><CButton color="danger" onClick={() => props.changeMode("cancel")}>Cancel</CButton></CTableDataCell>
            <CTableDataCell><CButton color="success" onClick={onClick}>Confirm</CButton></CTableDataCell>
        </CTableRow>
    )
}

export default EditProductRow;