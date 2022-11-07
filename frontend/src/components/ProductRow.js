import { CButton } from '@coreui/react';
import { Link } from 'react-router-dom';

const ProductRow = (props) => {

    // onClick ostoskoriin lisäämiseksi
    const onClick = (event) => {
        let tempCart = [...props.cart];
        // Jos tuote on jo korissa, splice -> lisää määrään yhden
        for (const product of tempCart) {
            if (product.ID === props.product.ID) {
                product.quantity++;
                props.setCart(tempCart);
                return;        
            }
        }

        tempCart.push({...props.product, quantity: 1});
        props.setCart(tempCart);
    }

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
        linkRender = <td><Link to={`/${props.product.category}/${props.product.ID}`}>Tuotesivulle</Link></td>
    }

    return (
        <tr>
            <td>{props.product.name}</td>
            <td>{props.product.price}€</td>
            <td><CButton onClick={onClick} name="addproduct" id="addproduct" color="secondary">Lisää ostoskoriin</CButton></td>
            {linkRender}
            {adminRender}
        </tr>
    )
}

export default ProductRow;