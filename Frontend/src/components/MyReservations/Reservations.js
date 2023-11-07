import React, { useEffect } from 'react'
import './Reservations.css'
import { Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'

const Reservations = ({ reservations }) => {
  const navigate = useNavigate();

  const handleClick = event => {
    event.preventDefault();
    console.log(event.target.id);
    fetch("http://localhost:3000/reservations/" + event.target.id, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
      alert("Deleting Reservation successful");
      navigate('/MyReservations', {})
  };

  return (
    <div className='col-sm-9 container-fluid reservations'>
      <Card className='card-prop-row' style={{ width: '18rem' }}>
      <Card.Img variant="top" src={reservations.img} />
      <Card.Body>
        <Card.Title>{reservations.title}</Card.Title>
        <Card.Text>
          <p className="card-discription"><strong>Booked on:</strong> {new Date(reservations.reservation_date).toLocaleString("en-US", {
          timeZone: "America/Chicago",
        }).split(',')}</p>
          <p className="card-discription"><strong>Check In Date:</strong> {reservations.checkIn_date}</p>
          <p className="card-discription"><strong>Check Out Date:</strong> {reservations.checkOut_date}</p>
          <br></br>
        </Card.Text>
        { 
          (Math.round(new Date().getTime() / 1000) - Math.round(new Date(reservations.reservation_date).getTime() / 1000) < (48 * 3600))
          ? <Button id={reservations._id} variant="primary" className='btn btn-primary book' onClick={ handleClick }>Cancel</Button>
          : ''
        }
      </Card.Body>
    </Card>
    </div>
  );
}

export default Reservations
