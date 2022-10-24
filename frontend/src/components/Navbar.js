import { CNav, CNavbar, CHeaderBrand, CForm, CFormInput, CButton, CContainer, 
            CDropdown, CDropdownMenu, CDropdownItem, CDropdownToggle, CImage, CRow, CCol } from '@coreui/react'
import { useState } from 'react';


const Navbar = (props) => {


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
    }

    /* const [visible, setVisible] = useState(false) */
    
    //CNavbar: "sticky-top" pitää Navbarin aina näkyvillä.

    return (
    <CNavbar expand="lg" colorScheme='light' style={{ backgroundColor:'#6d1313'}}  placement="sticky-top"> 
    <CContainer fluid>
        
        <CHeaderBrand href="/" color="">
        <CRow>
            <CCol sm>
                <CImage fluid src="/icon-small.png" />
            </CCol>

            <CCol>
                <CHeaderBrand href="/" style={{color:"white"}}>
                    Verkkokauppa
                </CHeaderBrand>

                <CDropdown variant="nav-item">
                    <CDropdownToggle  color="secondary">Kategoriat</CDropdownToggle>
                     <CDropdownMenu>
                        <CDropdownItem href="paidat">paidat</CDropdownItem>
                        <CDropdownItem href="housut">housut</CDropdownItem>
                        <CDropdownItem href="lakit">lakit</CDropdownItem>
                    </CDropdownMenu>
                </CDropdown>
                
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
            <CButton type="submit" color="success" onClick={onClick} style={{marginLeft:"10px"}} variant="outline">
                Hae
            </CButton>
        </CForm>
        </CContainer>
    </CNavbar>
    )
}

export default Navbar;