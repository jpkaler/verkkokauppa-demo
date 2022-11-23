import { CRow, CContainer, CButton, CButtonGroup } from "@coreui/react";
import { Link } from 'react-router-dom';

const CategoryBar = (props) => {

	const onClick = (event) => {
		props.setCurrentCategory(event.target.name);

	}

	let categories = props.categories.map((category) => 
			<Link key={props.categories.indexOf(category)} to={`/${category.category}`}>
				<CButton className="btn-category" color="black" variant="ghost"
					id={category.category}
					name={category.category}
					onClick={onClick}>
						{category.category.toUpperCase()}
				</CButton>
			</Link>)

	return (
		<CContainer fluid className= "category-bar">
			<CRow> 
				<CButtonGroup horizontal-role="group" aria-label="Category links" >
					{categories}
				</CButtonGroup>
			</CRow>
		</CContainer>
	)
}

export default CategoryBar;