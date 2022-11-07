import { CButton, CTableDataCell, CTableRow } from '@coreui/react';
import { Link } from 'react-router-dom';

const ShoppingCartRow = (props) => {

    // Napin painalluksesta rivin pitäisi muuttua joko muokattavaksi tai poistettavaksi

    const removeFromCart = (event) => {
        let tempCart = [...props.cart];
        
        for (let i=0; i<tempCart.length; i++) {
            if (tempCart[i].ID === props.ID) {
                tempCart.splice(i, 1);
                props.setCart(tempCart);
                return;
            }
        }
    }

    const oneLess = () => {
        let tempCart = [...props.cart];

        for (let i=0; i<tempCart.length; i++) {
            if (tempCart[i].ID === props.ID) {
                tempCart[i].quantity--;
                if (tempCart[i].quantity === 0) {
                    tempCart.splice(i, 1);
                }
                props.setCart(tempCart);
                return;
            }
        }

    }

    const oneMore = () => {
        let tempCart = [...props.cart];

        for (let i=0; i<tempCart.length; i++) {
            if (tempCart[i].ID === props.ID) {
                tempCart[i].quantity++;
                props.setCart(tempCart);
                return;
            }
        }
    }

    return (
        <CTableRow>
            <CTableDataCell>{props.name}</CTableDataCell>
            <CTableDataCell>{props.price}</CTableDataCell>
            <CButton color="secondary" id="oneLess" name="oneLess" onClick={oneLess}>-</CButton>
            <CTableDataCell>{props.quantity}</CTableDataCell>
            <CButton color="secondary" id="oneMore" name="oneMore" onClick={oneMore}>+</CButton>
            <CButton color="secondary" onClick={removeFromCart} >
                Remove
            </CButton>

        </CTableRow>
    )
}

export default ShoppingCartRow;