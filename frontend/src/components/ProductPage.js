import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CRow, CImage, CContainer, CCol, CHeader, CButton } from '@coreui/react';
import CategoryBar from "./CategoryBar";

const ProductPage = (props) => {
    
    const [state, setState] = useState({
        product: {
            ID:0,
            name:"jee",
            price:0.00,
            category:"joo"
        }
    })

    const navigate = useNavigate();
    const { productId } = useParams();
    console.log("product page renderöi");

    useEffect(() => {
        let tempProduct = props.products.find((product) => product.ID === parseInt(productId));
        if (tempProduct) {
            console.log("tempProduct:",tempProduct);
            setState({product: tempProduct});
        }
    }, [productId]);
    
    const onClick = (event) => {
        let tempCart = [...props.cart];
        // Jos tuote on jo korissa, splice -> lisää määrään yhden
        for (const product of tempCart) {
            if (product.ID === state.product.ID) {
                product.quantity++;
                props.setCart(tempCart);
                return;        
            }
        }

        tempCart.push({...state.product, quantity: 1});
        props.setCart(tempCart);
    }

    return (
        <div>
            <CContainer fluid className="overflow-hidden min-vh-100">
                <CRow className="justify-content-center" xs={{ gutter: 4 }}>
                    <CCol className="align-self-center">
                        <CImage align="center" fluid src="/placeholder-large.jpg" />
                    </CCol>
                    <CCol md={8} className="align-self-center">
                        <CHeader>
                            <h2>{state.product.name}</h2>
                        </CHeader>
                    <CCol>
                            <h6>{state.product.category}</h6>
                            <h4>{state.product.price} €</h4>
                            <h6>{state.product.info}</h6>
                    </CCol>
                        <CButton color="secondary" onClick={onClick}>
                            Lisää ostoskoriin
                        </CButton>
                    </CCol>
                    <CButton onClick={() => navigate(-1)}>Takaisin</CButton>
                </CRow>
            </CContainer>
        </div>
    )
};

export default ProductPage;