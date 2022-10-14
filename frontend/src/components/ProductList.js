import Product from './Product';

const ProductList = (props) => {
    console.log("Tuotteet");

    let products =  props.filteredProducts().map((product) => {
        return <Product key={product.ID} name={product.name} price={product.price} category={product.category} />
    })
  
    return (
        <table>
            <thead>
                <tr>
                    <th>Nimi</th>
                    <th>Hinta</th>
                    <th>Kategoria</th>
                </tr>
            </thead>
            <tbody>
                {products}
            </tbody>
        </table>
    )
}

export default ProductList;