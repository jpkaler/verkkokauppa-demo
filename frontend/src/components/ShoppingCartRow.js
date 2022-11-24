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
        <CTableRow className="shopping-cart">
            <CTableDataCell>{props.name}</CTableDataCell>
            <CTableDataCell>{props.price.toFixed(2)}€</CTableDataCell>
            <CTableDataCell>
                <CButton color="secondary" id="oneLess" name="oneLess" variant="outline" onClick={oneLess}>-</CButton>
                {props.quantity}
                <CButton color="secondary" id="oneMore" name="oneMore" variant="outline" onClick={oneMore}>+</CButton>
            </CTableDataCell>
            <CTableDataCell>
                <CButton color="secondary" onClick={removeFromCart} >
                    Remove
                </CButton>
            </CTableDataCell>

        </CTableRow>
    )
}

export default ShoppingCartRow;