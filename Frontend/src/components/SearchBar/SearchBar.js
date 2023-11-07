import React from 'react'

const SearchBar = ({ filterText, placeholder, onFilterTextChange }) => {
  return (
    <form style={{ marginBottom: '30px' }}>
      <input
        type="text"
        value={filterText}
        placeholder={placeholder}
        onChange={(e) => onFilterTextChange(e.target.value)} />
    </form>
  );
}


export default SearchBar
