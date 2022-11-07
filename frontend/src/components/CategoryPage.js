import CategoryBar from "./CategoryBar";
import ProductList from "./ProductList";

const CategoryPage = (props) => {

    

    return (
        <>
            <CategoryBar categories={props.categories} getProductsByCategory={props.getProductsByCategory} setCurrentCategory={props.setCurrentCategory}/>
            <ProductList products={props.products} setCart={props.setCart} cart={props.cart}/>
        </>
    )
}

export default CategoryPage;