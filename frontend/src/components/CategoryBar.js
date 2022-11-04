import { CButton, CButtonGroup } from "@coreui/react";
import { Link } from 'react-router-dom';

const CategoryBar = (props) => {

	const onClick = (event) => {
		props.setCurrentCategory(event.target.name);
	}

	let categories = props.categories.map((category) => 
			<Link key={props.categories.indexOf(category)} to={`/${category.category}`}>
				<CButton
					id={category.category}
					name={category.category}
					onClick={onClick}>{category.category}</CButton>
			</Link>)

	return (
		<CButtonGroup vertical role="group" aria-label="Category links">
			{categories}
		</CButtonGroup>

	)
}

export default CategoryBar;