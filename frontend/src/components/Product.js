import { Link } from 'react-router-dom';

const Product = (props) => {

    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.price}</td>
            <td>{props.category}</td>
            <td><Link to={`/${props.ID}`}>Tuotesivulle</Link></td>
        </tr>
    )
}

export default Product;