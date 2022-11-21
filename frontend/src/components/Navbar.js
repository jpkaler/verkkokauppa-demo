import { Link, useNavigate } from 'react-router-dom';
import { CFooter,CNavbar, CNavbarBrand, CNavbarNav, CNavLink, CNavItem, CHeaderBrand, CForm, CFormInput, CContainer, CButton, CImage, CRow, CCol } from '@coreui/react'
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
        
    }
    
    //CNavbar: "sticky-top" pitää Navbarin aina näkyvillä.
    let loginRender = <></>
    if (props.isLogged) {
        loginRender = (<>
            <CButton>{props.user}</CButton>
            <CButton onClick={logoutClick} name="logout">Logout</CButton>
        </>)
    } else {
        loginRender = (<CForm className="d-flex" name="login">
            <CFormInput type="text" name="username" id="username" placeholder='Käyttäjätunnus' onChange={onChange} value={state.username} />
            <CFormInput type="password" name="password" id="password" placeholder='Salasana' onChange={onChange} value={state.password} />
            <CButton type="submit" color="dark" onClick={loginClick} shape="rounded-0"  variant="outline">
                <CNavLink to="/">
                    Kirjaudu sisään
                </CNavLink>
            </CButton>
        </CForm>)
    }

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
                <CForm className="d-flex" name="search">
                    <CFormInput type="text" name="search" id="search" placeholder='Hae tuotetta' onChange={onChange} value={state.search} />
                    <CButton type="submit" color="dark" onClick={onClick} shape="rounded-0"  variant="outline">
                        <CNavLink to="/">
                            Hae
                        </CNavLink>
                    </CButton>
                </CForm>
                {loginRender}
                <CForm className="d-flex"> 
                    <Link to="/cart">
                        Ostoskori
                    </Link> 
                </CForm>
            </CNavbarNav>  

        </CContainer>
    </CNavbar>
    )
}

export default Navbar;