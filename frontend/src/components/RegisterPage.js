import { CForm, CFormInput, CButton, CRow, CContainer } from "@coreui/react";
import { useState } from 'react';


const RegisterPage = (props) => {

    const [state, setState] = useState({
        username:"",
        password:""
    })

    const onChange = (event) => {
        setState((state) => {
            return {
                ...state,
                [event.target.name]: event.target.value
            }
        })
    }

    const register = (event) => {
        event.preventDefault();
        props.register(state);

        setState({
            username:"",
            password:""
        })
    }

    return (
        <CContainer className="overflow-hidden min-vh-100">
        <CForm onSubmit={register}>
            <CRow className="position-relative">
                <CFormInput
                    type="text"
                    id="username"
                    name="username"
                    label="Käyttäjätunnus"
                    value={state.username}
                    onChange={onChange}
                    placeholder="Anna käyttäjätunnus"
                    required
                />
            </CRow>

            <CRow className="position-relative">
                <CFormInput
                    type="password"
                    id="password"
                    name="password"
                    label="Salasana"
                    value={state.password}
                    onChange={onChange}
                    placeholder="Anna salasana"
                    required
                />
            </CRow>
            <CButton type="submit" id="register">Rekisteröidy</CButton>
            <h4>{props.error.message}</h4>
        </CForm>      
        </CContainer>  
    )
}

export default RegisterPage;