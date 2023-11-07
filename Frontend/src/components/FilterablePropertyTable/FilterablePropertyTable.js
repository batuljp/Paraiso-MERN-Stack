import React, { useState } from 'react'
import SearchBar from '../SearchBar/SearchBar';
import PropertyTable from '../PropertyTable/PropertyTable';
import { useLocation, useNavigate } from 'react-router-dom';
// import DetailsPage from '../DetailsPage/DetailsPage';
import "./FilterablePropertyTable.css";

const FilterablePropertyTable = ({ properties }) => {
  const [filterText1, setFilterText1] = useState('');
  const [filterText2, setFilterText2] = useState('');
  const [SearchCity, setSearchCity] = useState('');
  const [SearchProperty, setSearchProperty] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state;
  console.log('UserID Properties: ', userId)

  // const AndOr = document.querySelector('input[name="conditionLogic"]:checked').value;
  // if(document.getElementById('conditionLogic').checked == true) {   
  //   conditionLogic="And";
  // } else {  
  //   conditionLogic="Or";  
  // } 

  const handleClick = event => {
    navigate('/AddNew', { state: userId })
  };

  return (
    <div className='col-sm-9 container-fluid'>
      <button type="submit" onClick={handleClick}>Add New Property</button>
      {/* <SearchBar
        filterText1={filterText1}
        placeholder={'Search city...'}
        onFilterTextChange={setFilterText1} /> */}
          <input 
              type="checkbox" 
              id="SearchCity"
              name="SearchCity"
              value={SearchCity}
              onChange={(e) => setSearchCity(e.target.checked)}
            />
          <label for="SearchCity">
            Please click the checkbox if you want to search Location
          </label> 
        <SearchBar
          filterText1={filterText1}
          placeholder={'Search city...'}
          onFilterTextChange={setFilterText1} />
        <input 
          type="checkbox" 
          id="SearchProperty"
          name="SearchProperty"
          value={SearchProperty}
          onChange={(e) => setSearchProperty(e.target.checked)}
        />
        <label>
          Please click the checkbox if you want to search Property Type
        </label>
        <SearchBar
          filterText2={filterText2}
          placeholder={'Search property type...'}
          onFilterTextChange={setFilterText2} />
      

      <PropertyTable
        properties={properties}
        filterText1={filterText1}
        filterText2={filterText2}
        userId = {userId}
        SearchCity = {SearchCity}
        SearchProperty = {SearchProperty}
        />
    </div>
  );
}

export default FilterablePropertyTable
