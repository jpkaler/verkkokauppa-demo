import ShoppingCartRow from "./ShoppingCartRow";
import { useState } from 'react';
import { CButton, CTable, CTableHead, CTableBody, CTableHeaderCell, CTableRow, CTableDataCell } from '@coreui/react';

const ShoppingCart = (props) => {

  const [orderMessage, setOrderMessage] = useState("");

  let total = 0.00;
  

  let products = props.cart.map((product) => {
    total += product.price * product.quantity;
    return <ShoppingCartRow key={product.ID} ID={product.ID} name={product.name} price={product.price} quantity={product.quantity} setCart={props.setCart} cart={props.cart}/>
  })

  const order = () => {
    setOrderMessage(`Tuotteesi on tilattu! Tilasit vaatteita ${total} eurolla.`);
    props.setCart([]);
  }

    return (  
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Nimi</CTableHeaderCell>
            <CTableHeaderCell scope="col">Hinta</CTableHeaderCell>
            <CTableHeaderCell scope="col">Määrä</CTableHeaderCell>
          </CTableRow>
        </CTableHead>      
        <CTableBody>
          {products} 
          <CTableRow>
            <CTableDataCell style={{fontWeight:"bold"}}>Yhteensä:</CTableDataCell>
            <CTableDataCell style={{fontWeight:"bold"}}>{Math.round(total * 100) / 100}€</CTableDataCell>
			<CTableDataCell></CTableDataCell>
			<CTableDataCell style={{fontWeight:"bold"}}><CButton onClick={order}>Tilaa</CButton></CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell colspan="3"><h2>{orderMessage}</h2></CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    )
}
    
export default ShoppingCart;