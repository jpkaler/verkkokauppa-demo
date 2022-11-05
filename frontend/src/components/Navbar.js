import { Link, useNavigate } from 'react-router-dom';
import { CNavbar, CHeaderBrand, CForm, CFormInput, CContainer, CButton, CImage, CRow, CCol } from '@coreui/react'
import { useState } from 'react';

const Navbar = (props) => {

    let navigate = useNavigate();
    // Hakukentän toiminnallisuus
    const [state, setState] = useState({
        search:""
    })

    const onChange = (event) => {
        setState({[event.target.name]: event.target.value})
    }

    const onClick = (event) => {
        event.preventDefault();
        props.searchProducts(state.search.trim());
        navigate("/");
    }
    
    //CNavbar: "sticky-top" pitää Navbarin aina näkyvillä.

    return (
    <CNavbar expand="lg" className="bg-success"  placement="sticky-top"> 
    <CContainer fluid>
        <CHeaderBrand color="">
        <CRow>
            <CCol sm >
                <Link to="/"><CImage style={{height:"2.5em"}} fluid src="/icon-small.png" /></Link>
            </CCol>

        </CRow>
        </CHeaderBrand>
        
        
    </CContainer>

    <CContainer fluid align="end">
        <CForm className="d-flex justify-content-e" >
        
            <CFormInput type="text"
                    name="search"
                    id="search"
                    placeholder='Hae tuotetta'
                    onChange={onChange}
                    value={state.search} />
            <CButton type="submit" color="primary" onClick={onClick} style={{marginLeft:"10px"}} variant="outline">
                <Link to="/">
                Hae
                </Link>
            </CButton>

        </CForm>

        <p><Link to="/cart">Ostoskori</Link></p>
        
        </CContainer>
    
    </CNavbar>
    )
}

export default Navbar;