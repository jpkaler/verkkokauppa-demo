import { CButton } from '@coreui/react';
import { Link } from 'react-router-dom';

const ProductRow = (props) => {

    // Napin painalluksesta rivin pitäisi muuttua joko muokattavaksi tai poistettavaksi

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
        linkRender = <td><Link to={`/${props.ID}`}>Tuotesivulle</Link></td>
    }

    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.price}</td>
            <td>{props.category}</td>
            {linkRender}
            {adminRender}
        </tr>
    )
}

export default ProductRow;