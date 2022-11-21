import { Link, useNavigate } from 'react-router-dom';
import { CFooter,CNavbar, CNavbarBrand, CNavbarNav, CNavLink, CNavItem, CHeaderBrand, CForm, CFormInput, CContainer, CButton, CImage, CRow, CCol } from '@coreui/react'
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
        navigate(`/search?search=${state.search}`);
    }
    
    //CNavbar: "sticky-top" pitää Navbarin aina näkyvillä.

    return (
    <CNavbar expand="lg" placement="sticky-top"> 
        <CContainer fluid>
            <CNavbarNav>
                <CNavItem>
                    <CNavbarBrand>
                        <Link to="/">
                            <CImage style={{height:"2.5em"}} fluid src="/icon.png" />
                        </Link>
                    </CNavbarBrand>
                </CNavItem>
                <CForm className="d-flex">
                    <CFormInput type="text" name="search" id="search" placeholder='Hae tuotetta' onChange={onChange} value={state.search} />
                    <CButton className="btn-search" type="submit" onClick={onClick} shape="rounded-1">
                        <CNavLink to="/">
                            Hae
                        </CNavLink>
                    </CButton>
                </CForm>
            </CNavbarNav>  
            <CForm className="d-flex"> 
            <Link to="/cart">
                <CButton className="btn-cart">
                Ostoskori
                </CButton>
            </Link> 
            </CForm>

        </CContainer>
    </CNavbar>
    )
}

export default Navbar;