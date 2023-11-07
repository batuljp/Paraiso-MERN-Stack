import React, { useState } from 'react'
import SearchBar from '../SearchBar/SearchBar';
import PropertyTable from '../PropertyTable/PropertyTable';
import Reservations from './Reservations';
import ReservationsTable from './ReservationsTable';
// import DetailsPage from '../DetailsPage/DetailsPage';

const FilterReservations = ({ properties }) => {
  const [filterText, setFilterText] = useState('');
  return (
    <div className='col-sm-9 container-fluid reservation'>
      <SearchBar
        filterText={filterText}
        onFilterTextChange={setFilterText} />
      <ReservationsTable
        reservations={properties}
        filterText={filterText} />
    </div>
  );
}

export default FilterReservations
