import ProductRow from './ProductRow';
/* 
const UP_ARROW = '&#8593;';
const DOWN_ARROW = '&#8595;';
 */
const ProductList = (props) => {


    // Muokkaa products-listan Product-komponenteiksi
    let products = props.products.map((product) => {
        return <ProductRow key={product.ID} ID={product.ID} name={product.name} price={product.price} category={product.category}/>
    })

    
  
    return (
        <table>
            <thead>
                <tr>
                    <th><button id="name" name="name">Nimi</button></th>
                    <th><button id="price" name="price">Hinta</button></th>
                    <th><button id="category" name="category">Kategoria</button></th>
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