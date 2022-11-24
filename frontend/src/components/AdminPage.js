import AdminProductRow from "./AdminProductRow";
import AddProductRow from "./adminpage/AddProductRow";
import RemoveProductRow from "./adminpage/RemoveProductRow";
import EditProductRow from "./adminpage/EditProductRow";
import { useState } from 'react';
import { CHeader, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CContainer } from "@coreui/react";

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

    let products = props.products.map((product) => {
        if (state.removeId === product.ID) {
            return <RemoveProductRow key={product.ID} product={product} removeProduct={removeProduct} changeMode={changeMode} />
        }
        if (state.editId === product.ID) {
            return <EditProductRow key={product.ID} product={product} editProduct={editProduct} changeMode={changeMode} />
        }
        
        return <AdminProductRow key={product.ID} product={product} changeMode={changeMode}/>
    })

    let adminRender = <></>

    if (props.isAdmin) {
        adminRender = (
            <CContainer>
                <CHeader>Adminsivu</CHeader>
                <CTable>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell>Nimi</CTableHeaderCell>
                            <CTableHeaderCell>Hinta</CTableHeaderCell>
                            <CTableHeaderCell>Kategoria</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>

                    <CTableBody>
                    {products}
                    <CTableRow><CTableDataCell>Lisää tuotteita tietokantaan</CTableDataCell></CTableRow>
                    
                    </CTableBody>
                </CTable>
                <CTable>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell>Nimi</CTableHeaderCell>
                            <CTableHeaderCell>Hinta</CTableHeaderCell>
                            <CTableHeaderCell>Kategoria</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        <AddProductRow addProduct={props.addProduct} />
                    </CTableBody>
                </CTable>
            </CContainer>
        )
    }

    return (
        <>
            {adminRender}
        </>
    ) 
}

export default AdminPage;