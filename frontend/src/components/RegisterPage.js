import { CForm, CFormInput, CButton } from "@coreui/react";
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
        <CForm onSubmit={register}>
            <CFormInput
                type="text"
                id="username"
                name="username"
                label="Käyttäjätunnus"
                value={state.username}
                onChange={onChange}
                placeholder="Anna käyttäjätunnus"
            />
            <CFormInput
                type="password"
                id="password"
                name="password"
                label="Salasana"
                value={state.password}
                onChange={onChange}
                placeholder="Anna uusi salasana"
            />
            <CButton type="submit" id="register">Rekisteröidy</CButton>
        </CForm>        
    )

}

export default RegisterPage;