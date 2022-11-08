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
        navigate("/");
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
                    </CNavbarNav>
                        <CForm className="d-flex justify-content-e" >
                            <CFormInput type="text" name="search" id="search" placeholder='Hae tuotetta' onChange={onChange} value={state.search} />
                            <CButton type="submit" color="dark" onClick={onClick} shape="rounded-0" style={{marginLeft:"10px"}} variant="outline">
                                <CNavLink to="/">
                                Hae
                                </CNavLink>
                            </CButton>
                    </CForm>
                <CButton color="dark">
                    <Link to="/cart">
                    Ostoskori
                    </Link>
                </CButton>    
        </CContainer>
    </CNavbar>
    )
}

export default Navbar;