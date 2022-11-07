import ProductRow from './ProductRow';


/* 
const UP_ARROW = '&#8593;';
const DOWN_ARROW = '&#8595;';
 */
const ProductList = (props) => {


    // Muokkaa products-listan Product-komponenteiksi
    let products = props.products.map((product) => {
        return <ProductRow key={product.ID} product={product} setCart={props.setCart} cart={props.cart} />
    })

    
  
    return (
        <table>
            <thead>
                <tr>
                    <th>Nimi</th>
                    <th>Hinta</th>
                </tr>
            </thead>
            <tbody>
                {/* <tr>{props.error}</tr> */}
                {products}
            </tbody>
        </table>
    )
}

export default ProductList;