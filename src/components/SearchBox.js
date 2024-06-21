import React from "react";

const SearchBox = (props) => {
    return (
        <div className="flex-grow-1">
            <input className="form-control black-search-box" 
            value={props.searchValue}
            onChange={(event)=>props.setSearchValue(event.target.value) }
            placeholder="Szukaj"></input>
        </div>
    )
}

export default SearchBox;