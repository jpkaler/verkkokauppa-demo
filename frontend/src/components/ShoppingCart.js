import ShoppingCartRow from "./ShoppingCartRow";
import { CContainer, CButton, CTable, CTableHead, CTableBody, CTableHeaderCell, CTableRow, CTableDataCell } from '@coreui/react';
import { useState } from 'react';

const ShoppingCart = (props) => {

  const [orderMessage, setOrderMessage] = useState("");

  let total = 0.00;
  

  let products = props.cart.map((product) => {
    total += product.price * product.quantity;
    return <ShoppingCartRow key={product.ID} ID={product.ID} name={product.name} price={product.price} quantity={product.quantity} setCart={props.setCart} cart={props.cart}/>
  })

  const order = () => {
    setOrderMessage(`Tuotteesi on tilattu! Tilasit vaatteita ${total.toFixed(2)} eurolla.`);
    props.setCart([]);
  }

    return (  
      <CContainer fluid className="overflow-hidden min-vh-100">
        <CTable className="category-bar" small bordered align="middle" responsive >
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell className="w-25 shopping-cart" scope="col">Nimi</CTableHeaderCell>
              <CTableHeaderCell className="w-25 shopping-cart" scope="col">Hinta</CTableHeaderCell>
              <CTableHeaderCell className="w-25 shopping-cart" scope="col">Määrä</CTableHeaderCell>
              <CTableHeaderCell className="w-25 shopping-cart" scope="col"></CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {products} 
            <CTableRow>
              <CTableDataCell className="w-25 shopping-cart" style={{fontWeight:"bold"}}>Yhteensä:</CTableDataCell>
              <CTableDataCell className="w-25 shopping-cart" style={{fontWeight:"bold"}}>{total.toFixed(2)}€</CTableDataCell>
        <CTableDataCell></CTableDataCell>
        <CTableDataCell style={{fontWeight:"bold"}}><CButton onClick={order}>Tilaa</CButton></CTableDataCell>
            </CTableRow>
            <CTableRow className="shopping-cart">
              <CTableDataCell colSpan="3"><h2>{orderMessage}</h2></CTableDataCell>
              <CTableDataCell colSpan="3"></CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </CContainer>
    )
}
    
export default ShoppingCart;