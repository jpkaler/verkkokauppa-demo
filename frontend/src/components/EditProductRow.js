import { CButton } from "@coreui/react";
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
        <tr>
            <td>
                <input type="text"
                        name="name"
                        id="name"
                        onChange={onChange}
                        value={state.name}
                />
            </td>
            <td>
            <input type="number"
                    name="price"
                    id="price"
                    onChange={onChange}
                    value={state.price}
            />
            </td>
            <td>
                <input type="text"
                        name="category"
                        id="category"
                        onChange={onChange}
                        value={state.category}
                />
            </td>
            <td><CButton color="danger" onClick={() => props.changeMode("cancel")}>Cancel</CButton></td>
            <td><CButton color="success" onClick={onClick}>Confirm</CButton></td>
        </tr>
    )
}

export default EditProductRow;