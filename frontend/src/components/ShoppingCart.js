import ShoppingCartRow from "./ShoppingCartRow";
import { CRow, CCol, CButton, CTable, CTableHead, CTableBody, CTableHeaderCell, CTableRow } from '@coreui/react';

const ShoppingCart = (props) => {

  let products = props.cart.map((product) => {
    return <ShoppingCartRow key={product.ID} ID={product.ID} name={product.name} price={product.price} quantity={product.quantity} setCart={props.setCart} cart={props.cart}/>

  

  })

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
        </CTableBody>
      </CTable>
    )
}
    
export default ShoppingCart;