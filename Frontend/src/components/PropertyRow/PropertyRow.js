import React from 'react'
import { Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PropertyStyles.css'
import { useNavigate } from 'react-router-dom'

const PropertyRow = ({ property, userId }) => {
  const navigate = useNavigate();
  // console.log("UserID Property Row: ", userId)
  const handleClick = event => {
    // console.log(property)
    navigate('/PropertyDetails', {state:{property, userId}})
  };


  return (
    <Card className='card-prop-row' style={{ width: '18rem' }} onClick={ handleClick }>
      <Card.Img variant="top" src={property.img} />
      <Card.Body>
        <Card.Title>{property.title}</Card.Title>
        {/* <Card.Title>{property.type}</Card.Title> */}
        <Card.Text>
          <span className="card-star" style={{ float: "right" }}>
            <i className="bi bi-star-fill"></i>
            {property.star}
          </span>
          <p className="card-price"><strong>${property.nightlyFee}</strong> night</p>
          <p className="card-type">{property.type}</p>
          <p className="card-discription">{property.tagline}</p>
          <br/>
        </Card.Text>
        <Button variant="primary" className='btn btn-primary book' onClick={ handleClick }>Details</Button>
      </Card.Body>
    </Card>
  )
}

export default PropertyRow