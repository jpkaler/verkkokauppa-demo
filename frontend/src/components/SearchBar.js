import { useState, useEffect } from 'react';

const SearchBar = (props) => {
    const [state, setState] = useState({
        search:""
    })

    useEffect(() => {
        props.setSearch(state.search);
    }, [state])

    // Muokkaa statea hakukentän muuttuessa
    const onChange = (event) => {
        setState({[event.target.name]: event.target.value})
    }

    // Yhden tekstikentän form, joka saa arvonsa staten mukaan
    return (
        <form>
            <label htmlFor="search">Haku: </label>
            <input type="text"
                    name="search"
                    id="search"
                    onChange={onChange}
                    value={state.search}/>
        </form>
    )
}

export default SearchBar;