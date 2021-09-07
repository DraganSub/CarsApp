import React from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";

const SearchFilterInput = (props) => {
  return(
    <div>
      <Container maxWidth="sm">
        <div className="searchInput">
          <TextField   
            fullWidth
            variant="outlined"
            label="Search"
            type="text" 
            placeholder={props.placeholder}
            className="text-field"
            value={props.searchText}
            onChange={props.onChange} 
          />
        </div>
      </Container>
    </div>
  );
};
export default SearchFilterInput;