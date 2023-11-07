import React from 'react'
import Reservations from './Reservations';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ReservationsTable = ({ reservations, filterText }) => {
  const [reservationsData, setReservationsData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state
  console.log('UserID from Reservations Table: ', userId)

  const handleBackClick = event => {
    console.log("UserID from Reservations:", userId)
    navigate('/', { state: userId })
  };

  useEffect(() => {
    fetch('http://localhost:3000/reservations/' + userId, {
      method: "GET",
      mode: "cors",
      'Access-Control-Allow-Origin': 'http://localhost:3000/',
      headers: {
        "Content-Type": "application/json",
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setReservationsData(data)
        console.log(data)
      })
      .catch(console.log);
  }, []);

  const rows = [];
  reservationsData.forEach((reservation) => {
    console.log(filterText)
    // if (reservation.title.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
    // if (reservation.title.indexOf(filterText) === -1) {
    //   return;
    // }
    rows.push(
      <Reservations reservations={reservation} key={reservation.title}/>
    );
  });

  return (
    <div>
      <button variant="primary" className='btn btn-primary back' id = "reservation-back" onClick={handleBackClick}>Back</button>
      <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', }}>
        {rows}
      </div>
    </div>
  );
}

export default ReservationsTable