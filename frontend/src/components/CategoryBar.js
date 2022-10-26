import { CButton, CButtonGroup } from "@coreui/react";

const CategoryBar = (props) => {
    
    const onClick = (event) => {
        //event.preventDefault();
        props.editCategory(event.target.name);
        props.searchProducts("");
    }
    
    return (
      <CButtonGroup vertical role="group" aria-label="Category filter buttons">
        <CButton id="paidat" name="paidat" onClick={onClick}>Paidat</CButton>
        <CButton id="housut" name="housut" onClick={onClick}>Housut</CButton>
        <CButton id="lakit" name="lakit" onClick={onClick}>Lakit</CButton>
      </CButtonGroup>
        
    )
}

export default CategoryBar;