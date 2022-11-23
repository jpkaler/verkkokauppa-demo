import { Link, useNavigate,useLocation } from 'react-router-dom';
import { CFooter,CNavbar, CNavbarBrand, CNavbarNav, CNavLink, CNavItem, CHeaderBrand, CForm, CFormInput, CContainer, CButton, CImage, CRow, CCol, CTooltip } from '@coreui/react'
import { useState } from 'react';

const Navbar = (props) => {

    let navigate = useNavigate();
    // Hakukentän toiminnallisuus
    const [state, setState] = useState({
        search:"",
        username: "",
        password: ""
    })

    const onChange = (event) => {
        setState((state) => {
            return {
                ...state,
                [event.target.name]: event.target.value
            }
        }) 
    }

    const onClick = (event) => {
        event.preventDefault();
        props.searchProducts(state.search.trim());
        navigate(`/search?search=${state.search}`);
    }

    const loginClick = (event) => {
        event.preventDefault();
        let user = {username: state.username, password: state.password};
        props.login(user);
        setState((state) => {
            return {
                ...state,
                password:""
            }
        })
    }

    const logoutClick = () => {
        
        props.logout();
    }
    
    //CNavbar: "sticky-top" pitää Navbarin aina näkyvillä.
    let loginRender = <></>
    let adminButton = <></>
    if (props.isLogged) {
        if (props.isAdmin) {
            adminButton = <CButton onClick={() => navigate("/admin")}>Adminsivu</CButton>
        }
        
        loginRender = (<>
            <CButton>{props.user}</CButton>
            {adminButton}
            <CButton onClick={logoutClick} name="logout">Kirjaudu ulos</CButton>
        </>)
    } else {
        loginRender = (
        <CContainer fluid>
                <CForm name="login" className="row g-3">
                <CCol xs="auto">
            <CFormInput type="text" size="sm" name="username" id="username" placeholder='Käyttäjätunnus' onChange={onChange} value={state.username} />
            <CFormInput className="me-2" type="password" size="sm" name="password" id="password" placeholder='Salasana' onChange={onChange} value={state.password} />
                </CCol>
            </CForm>
            <CRow>
            <CCol xs="auto">
            <CButton type="submit" color="dark" onClick={loginClick} shape="rounded-0" variant="outline">
                <CNavLink to="/">
                    Kirjaudu sisään
                </CNavLink>
            </CButton>
            <CButton component="a" color="dark" shape="rounded-0" variant="outline" onClick={() => navigate("/register")}>
                    Rekisteröidy
            </CButton>
            </CCol>
            </CRow>
        </CContainer>
        )
    }

    return (
    <CNavbar expand="lg" placement="sticky-top"> 
        <CContainer fluid>
            <CCol md="auto">
            <Link to="/">
                <CNavbarBrand href="#">
                    <img
                    src="/icon.png"
                    alt=""
                    width="250"
                    height="60"
                    className="d-inline-block align-top"
                    />{' '}      
                </CNavbarBrand>
            </Link>
            </CCol>
            <CCol xs="auto" md={5} className="justify-content-start">
            <CForm className="d-flex" name="search">
                <CFormInput className="me-2" type="text" name="search" id="search" placeholder='Hae tuotetta' onChange={onChange} value={state.search} />
                <CButton className="btn-search" type="submit" onClick={onClick} shape="rounded-1">
                    <CNavLink to="/">
                        Hae
                    </CNavLink>
                </CButton>
            </CForm>
            </CCol>
            <CCol xs="auto" md="auto">
            {loginRender} 
            </CCol>
            <CCol xs="auto" md="" className="justify-self-end">
            <CForm className="d-flex"> 
                <Link to="/cart">
                    <CButton className="btn-cart">
                    Ostoskori
                    </CButton>
                </Link> 
            </CForm>
            </CCol>
        </CContainer>
    </CNavbar>
    )
}

export default Navbar;