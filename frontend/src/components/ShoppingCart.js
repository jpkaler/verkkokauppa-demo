import ShoppingCartRow from "./ShoppingCartRow";
import ProductRow from "./ProductRow";
import { CRow, CCol, CButton } from '@coreui/react';

const ShoppingCart = (props) => {

  let products =  props.cart.map((product) => {
    return <ShoppingCartRow key={product.ID} ID={product.ID} name={product.name} price={product.price} category={product.category} removeFromCart={props.removeFromCart}/>

  

  })

    return (  
      <CRow>      
        {products} 
      </CRow>
    )
}
    
export default ShoppingCart;