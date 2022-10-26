import ProductRow from "./ProductRow";
import AddProductRow from "./adminpage/AddProductRow";
import RemoveProductRow from "./adminpage/RemoveProductRow";
import EditProductRow from "./adminpage/EditProductRow";
import { useState } from 'react';

const AdminPage = (props) => {

    const [state, setState] = useState({
        removeId: -1,
        editId: -1
    })

    const changeMode = (mode, id) => {
        if (mode === "remove") {
            setState({
                removeId: id,
                editId: -1
            })
        }
        if (mode === "edit") {
            setState({
                removeId: -1,
                editId: id
            })
        }
        if (mode === "cancel") {
            setState({
                removeId: -1,
                editId: -1
            })
        }
    }

    const removeProduct = (productId) => {
        props.removeProduct(productId);
        changeMode("cancel");
    }

    const editProduct = (productId, product) => {
        props.editProduct(productId, product);
        changeMode("cancel");
    }

    let products =  props.products.map((product) => {
        if (state.removeId === product.ID) {
            return <RemoveProductRow key={product.ID} product={product} removeProduct={removeProduct} changeMode={changeMode} />
        }
        if (state.editId === product.ID) {
            return <EditProductRow key={product.ID} product={product} editProduct={editProduct} changeMode={changeMode} />
        }
        
        return <ProductRow key={product.ID} ID={product.ID} name={product.name} price={product.price} category={product.category} changeMode={changeMode} admin={true}/>
    })

    return (
        <div>
            <h2>Adminsivu</h2>
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
                <tr><td style={{padding:"15px 0", fontWeight:"bold"}}>Lisää tuotteita tietokantaan</td></tr>
                
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        <th>Nimi</th>
                        <th>Hinta</th>
                        <th>Kategoria</th>
                    </tr>
                </thead>
                <tbody>
                    <AddProductRow addProduct={props.addProduct} />
                </tbody>
            </table>
        </div>
    ) 
    // Tuotelista + Napit edit ja remove
    

}

export default AdminPage;