import {Link} from 'react-router-dom';
import { CNav, CNavbar, CHeaderBrand, CForm, CFormInput, CButton, CNavbarBrand, CNavItem, CNavLink, CContainer, 
            CDropdown, CDropdownMenu, CDropdownItem, CDropdownToggle } from '@coreui/react'
import SearchBar from './SearchBar';
import { useState, useEffect } from 'react';

const Navbar = (props) => {

    const [state, setState] = useState({
        search:"",
        products:[]
    })
    const setSearch = (search) => {
        setState((state) => {
            return {
                ...state,
                search:search
            }      
        });
    }

    const [visible, setVisible] = useState(false)
    
    //CNavbar: "sticky-top" pitää Navbarin aina näkyvillä.

    return (
    <CNavbar expand="lg" colorScheme="dark" className="bg-dark" placement="sticky-top"> 
    <CContainer fluid>
        <CHeaderBrand href="etusivu">
            Verkkokauppa
        </CHeaderBrand>
        
        <CDropdown variant="nav-item">
            <CDropdownToggle color="secondary" >Kategoriat</CDropdownToggle>
            <CDropdownMenu>
                <CDropdownItem href="paidat">paidat</CDropdownItem>
                <CDropdownItem href="housut">housut</CDropdownItem>
                <CDropdownItem href="lakit">lakit</CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
    </CContainer>

    <CContainer fluid>
        <CForm className="d-flex justify-content-e" >

        <SearchBar setSearch={setSearch} className="me-2" />
        
        {/*     <CFormInput type="search" className="me-2" placeholder="tuotteen nimi" />
            <CButton id="SearchButton" type="submit" variant="outline" color="success">
                Etsi tuotetta
            </CButton>  */}
        </CForm>
        </CContainer>
            <CNavLink href="#" active>
                    Linkki
            </CNavLink>
            <CNavLink href="#" active>
                    Linkki
            </CNavLink>
    </CNavbar>
    )
}

export default Navbar;