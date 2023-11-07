import React, { useEffect } from 'react'
import './Favorites.css'
import { Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'

const Favorites = ({ favorites, userId }) => {
  const navigate = useNavigate();

  const handleClick = event => {
    event.preventDefault();
    console.log(event.target.id);
    fetch("http://localhost:3000/favorites/" + event.target.id, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
      alert("Deleting favorite successful");
      navigate('/MyFavorites')
  };

  return (
    <div className='col-sm-9 container-fluid reservations'>
      <Card className='card-prop-row' style={{ width: '18rem' }} onClick={ handleClick }>
      <Card.Img variant="top" src={favorites.img} />
      <Card.Body>
        <Card.Title>{favorites.title}</Card.Title>
        <Card.Text>
          <span className="card-star" style={{ float: "right" }}>
            <i className="bi bi-star-fill"></i>
            {favorites.star}
          </span>
          <p className="card-price"><strong>{favorites.nightlyFee}</strong> night</p>
          <p className="card-discription">{favorites.tagline}</p>
          <br></br>
        </Card.Text>
        <Button id={favorites._id} variant="primary" className='btn btn-primary book' onClick={ handleClick }>Remove</Button>
      </Card.Body>
    </Card>
    </div>   

  );
}

export default Favorites
