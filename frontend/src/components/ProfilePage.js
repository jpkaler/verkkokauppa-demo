import { CContainer, CDropdownToggle, CDropdownItem, CDropdown, CDropdownMenu, CTableRow, CTableDataCell, CTable, CTableHead, CTableHeaderCell, CTableBody } from "@coreui/react";
import { useState } from 'react';

const ProfilePage = (props) => {

    const [orderInfo, setOrderInfo] = useState([]);
    const [orderTotal, setOrderTotal] = useState(0.00);

    const getOrderInfo = (event) => {
        
        const order = props.userOrders.filter((order) => {
            return order.ID === Number(event.target.name);
        });

        setOrderTotal(order[0].total);

        let products = order[0].orderedProducts.split(",");
        console.log(products);

        let productInfo = products.filter(product => product.length > 0).map((product) => {
            let splittedInfo = product.split(":");
            return (<CTableRow key={splittedInfo[0]} className="shopping-cart">
                        <CTableDataCell className="w-25 shopping-cart" scope="col">{splittedInfo[0]}</CTableDataCell>
                        <CTableDataCell className="w-25 shopping-cart" scope="col">{splittedInfo[1]} kpl</CTableDataCell>
                    </CTableRow>)
        })

        setOrderInfo(productInfo);
    }

    let orders = props.userOrders.map((order) => {
        let date = new Date(order.orderDate);
        return (<CDropdownItem key={order.ID} name={order.ID} onClick={getOrderInfo}>Tilausnumero: {order.ID} | Tilauspäivä: {date.toLocaleString()} | Kokonaissumma: {order.total.toFixed(2)}€</CDropdownItem>)
    })

    return (
        <CContainer fluid className="overflow-hidden min-vh-100">
            <h2 className="header">Käyttäjänimi: {props.user}</h2>
            <CDropdown variant="btn-group">
                <CDropdownToggle color="secondary" size="lg">Edelliset tilaukset</CDropdownToggle>
                <CDropdownMenu>
                    {orders}
                </CDropdownMenu>
            </CDropdown>
            
            <CTable className="category-bar" small bordered align="middle" responsive >
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell className="w-25 shopping-cart" scope="col">Tuote</CTableHeaderCell>
                        <CTableHeaderCell className="w-25 shopping-cart" scope="col">Määrä</CTableHeaderCell>
                        <CTableHeaderCell className="w-25 shopping-cart" scope="col"></CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {orderInfo} 
                    <CTableRow>
                        <CTableDataCell className="w-25 shopping-cart">Yhteensä:</CTableDataCell>
                        <CTableDataCell className="w-25 shopping-cart">{orderTotal.toFixed(2)}€</CTableDataCell>
                    </CTableRow>
                </CTableBody>
            </CTable>
        </CContainer>
    )
}

export default ProfilePage;