import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CRow, CImage, CCol, CHeader, CButton } from '@coreui/react';

const ProductPage = (props) => {
    
    const [state, setState] = useState({
        product: {
            ID:0,
            name:"jee",
            price:0.00,
            category:"joo"
        }
    })

    const { productId } = useParams();
    console.log("product page renderöi");

    useEffect(() => {
        let tempProduct = props.products.find((product) => product.ID === parseInt(productId));
        if (tempProduct) {
            console.log("tempProduct:",tempProduct);
            setState({product: tempProduct});
        }
    }, [productId])
    
    const onClick = (event) => {
        event.preventDefault();
        props.addToCart(state.product)
        console.log("")
    }

    return (
        <div>
            <CRow>
                ""
            </CRow>

            <CRow> 
            <CCol>
            </CCol>
            <CCol>
            <CImage align="center" fluid src="/placeholder-large.jpg" />
            </CCol>
            
            <CCol md={8}>
                <CHeader>
                    <h2>{state.product.name}</h2>
                </CHeader>
            <h6>{state.product.category}</h6>
            <h4>{state.product.price} €</h4>
            <h6>{state.product.info}</h6>
           
            <CButton type="submit" color="secondary" onClick={onClick}>Lisää ostoskoriin</CButton>
            <p><Link to="/">Etusivulle</Link></p>


            </CCol>
            </CRow>
        </div>
    )
};

export default ProductPage;