import { CCol, CContainer, CRow } from "@coreui/react";
import { useEffect } from "react";
import CategoryBar from "./CategoryBar";

const HomePage = (props) => {

    useEffect(() => {
        props.setHomePageState();
    }, [])

    return (
        <CContainer fluid className="overflow-hidden min-vh-100"> 
                <CCol md="auto" className="category-bar">
                    <CategoryBar categories={props.categories} setCurrentCategory={props.setCurrentCategory}/>
                </CCol>
                <CCol md="8">
                </CCol>
                <CContainer fluid className="category-bar">
                    <h2 style={{margin: "20px", color:"white"}}>Tervetuloa verkkokauppa-demoon!</h2>
                    <CRow><p style={{margin: "16px", color:"white", maxWidth:"60%", textAlign:"justify", fontSize:"14px"}}>Tällä sivustolla voit elää shoppailijan unelmaa ja selailla lukuisia tuotteita useista eri kategorioista. Tuotteet löytyvät sekä kategoriasivuilta että hakukentän avulla. Kokeile lisätä tuotteita ostoskoriin ja muokata ostoskoria itsellesi mieluisammaksi. Voit myös luoda itsellesi käyttäjätunnuksen rekisteröitymissivulta ja kirjautua sisään sivustolle.</p>
                    </CRow>
                    <CRow><p style={{margin: "16px", color:"white", maxWidth:"60%", textAlign:"justify", fontSize:"14px"}}>Tämä sovellus on Opiframen järjestämän OpiKoodia -koulutuksen loppuprojekti. Tekijöinä Juho Kalermo ja Riku Sänkiaho.</p>
                    </CRow>
                </CContainer>   
        </CContainer>   
    )
}

export default HomePage;