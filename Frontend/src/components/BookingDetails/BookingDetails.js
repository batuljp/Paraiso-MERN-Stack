import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import './BookingDetails.css'
import DatePicker from "react-datepicker";


import "react-datepicker/dist/react-datepicker.css";

const BookingDetails = () => {
  const location = useLocation();
  const state = JSON.parse(location.state)
  const userId = state.userId
  const property = state.details
  console.log('Booking Property: ', property)
  console.log('Book Property UserID: ', userId)
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [bookProperty, setBookProperty] = useState();

  // useEffect(() => {
  //   fetch('http://localhost:3000/properties/6363020d568cfc4953a4ee73', {
  //     method: "GET",
  //     mode: "cors",
  //     'Access-Control-Allow-Origin': 'http://localhost:3000/',
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: 'application/json',
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setBookProperty(data)
  //       console.log(data)
  //     })
  //     .catch(console.log);
  // }, []);  

  const handleClick = event => {
    event.preventDefault();
    console.log(startDate,endDate)
    event.preventDefault();
    console.log("clicked");
    fetch("http://localhost:3000/reservations/addnewreservation", {
      method: "POST",
      body: JSON.stringify({
        user_id: event.target.id,
        reservation_date: new Date(),
        // card_type: req.body.card_type,
        // payment_date: req.body.payment_date,
        // amount: req.body.amount,
        // card_number: req.body.card_number,
        property_id: property._id,
        title: property.title,
        type: property.type,
        // img: property.img,
        checkIn_date: document.getElementById("checkin").value,
        checkOut_date: document.getElementById("checkout").value,
        email: document.getElementById("username").value,
        user_id: userId
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      // Converting received data to JSON
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Reserved successfully");
        navigate('/MyReservations', { state: userId })
      })
      .catch(console.log);
  };

  return (
    <div className='booking'>
      <Form className='form'>
        <div id="form_details">        
          <a>Check-in
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              id='checkin'
            /></a>
          <a>Check-out
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              id='checkout'
            /></a>
          <a>Enter Number of Guests
            <input type="number" max= "5" min = "1" placeholder="1"></input>
          </a>
          <a>Email
            <input type="text" id='username'></input>
          </a>
          <br/>
          <div>
            <Button className="btn btn-primary"  id = "book" onClick={handleClick}>Reserve</Button>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default BookingDetails
