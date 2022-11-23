import { CButton, CFormInput, CTableDataCell, CTableRow} from '@coreui/react';
import { useState } from 'react';

const AddProductRow = (props) => {

    const [state, setState] = useState({
        name:"",
        price:0.00,
        category:""
    })

    const [error, setError] = useState("")

    const onChange = (event) => {
        setError("");
        setState((state) => {
            return {
                ...state,
                [event.target.name]:event.target.value
            }
        })
    }

    const onClick = (event) => {
        if (!(state.name.trim())) {
            setError("Anna tuotteelle nimi");
            return;
        }
        if(state.price <= 0) {
            setError("Hinnan täytyy olla positiivinen");
            return;
        }
        let product = {
            ...state
        }
        console.log("Ollaanko täällä? ADD PRODUCT ROW");
        props.addProduct(product);
        setState({
            name:"",
            price:0.00,
            category:""
        })
    }

    return (
        <CTableRow>
            <CTableDataCell>
                <CFormInput type="text"
                        name="name"
                        id="name"
                        onChange={onChange}
                        value={state.name}
                        placeholder="Nimi"
                />
            </CTableDataCell>
            <CTableDataCell>
                <CFormInput type="number"
                        name="price"
                        id="price"
                        step="0.01"
                        onChange={onChange}
                        value={state.price}
                        placeholder="Hinta"
                />
            </CTableDataCell>
            <CTableDataCell>
                <CFormInput type="text"
                        name="category"
                        id="category"
                        onChange={onChange}
                        value={state.category}
                        placeholder="Kategoria"
                />
            </CTableDataCell>
            <CTableDataCell><CButton onClick={onClick}>Lisää tuote</CButton></CTableDataCell>
            <CTableDataCell>{error}</CTableDataCell>
        </CTableRow>
    )
}

export default AddProductRow;