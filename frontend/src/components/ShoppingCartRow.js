import { CButton } from '@coreui/react';
import { Link } from 'react-router-dom';

const ShoppingCartRow = (props) => {

    // Napin painalluksesta rivin pitäisi muuttua joko muokattavaksi tai poistettavaksi

    const onClick = (event) => {
        props.removeFromCart(props.ID)
    }



    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.price}</td>
            <td>{props.category}</td>
            <CButton onClick={onClick} >
                Remove
            </CButton>

        </tr>
    )
}

export default ShoppingCartRow;