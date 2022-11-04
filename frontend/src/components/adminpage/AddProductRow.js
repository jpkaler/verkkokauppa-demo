import { CButton } from '@coreui/react';
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
        <tr>
            <td>
                <input type="text"
                        name="name"
                        id="name"
                        onChange={onChange}
                        value={state.name}
                        placeholder="Nimi"
                />
            </td>
            <td>
                <input type="number"
                        name="price"
                        id="price"
                        step="0.01"
                        onChange={onChange}
                        value={state.price}
                        placeholder="Hinta"
                />
            </td>
            <td>
                <input type="text"
                        name="category"
                        id="category"
                        onChange={onChange}
                        value={state.category}
                        placeholder="Kategoria"
                />
            </td>
            <td><CButton onClick={onClick}>Lisää tuote</CButton></td>
            <td>{error}</td>
        </tr>
    )
}

export default AddProductRow;