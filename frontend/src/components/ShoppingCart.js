import ShoppingCartRow from "./ShoppingCartRow";
import ProductRow from "./ProductRow";
import { CFooter, CRow, CCol, CButton, CTable, CTableHead, CTableBody, CTableHeaderCell } from '@coreui/react';

const ShoppingCart = (props) => {

  let products = props.cart.map((product) => {
    return <ShoppingCartRow key={product.ID} ID={product.ID} name={product.name} price={product.price} quantity={product.quantity} setCart={props.setCart} cart={props.cart}/>

  

  })

    return (  
      <CTable>
        <CTableHead>
          <CTableHeaderCell scope="col">Nimi</CTableHeaderCell>
          <CTableHeaderCell scope="col">Hinta</CTableHeaderCell>
          <CTableHeaderCell scope="col">Määrä</CTableHeaderCell>
        </CTableHead>      
        <CTableBody>
          {products} 
        </CTableBody>
        <CFooter position="fixed">
                <span> 2022 Juho Kalermo & Riku Sänkiaho</span>
            </CFooter>
      </CTable>
    )
}
    
export default ShoppingCart;