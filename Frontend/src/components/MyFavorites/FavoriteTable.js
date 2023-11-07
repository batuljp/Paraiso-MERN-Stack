import React from 'react'
import { useState, useEffect } from 'react';
import Favorites from './Favorites';
import { Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const FavoriteTable = ({ favorites, filterText }) => {
  const [favoritesData, setFavoritesData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state
  // console.log('UserID from Favorites Table: ', userId)

  const handleBackClick = event => {
    console.log("UserID from Favorites:", userId)
    navigate('/', { state: userId })
  };

  useEffect(() => {
    fetch('http://localhost:3000/favorites/' + userId, {
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
        setFavoritesData(data)
        console.log(data)
      })
      .catch(console.log);
  }, []);

  const rows = [];
  favoritesData.forEach((favorite) => {
    console.log(filterText)
    // if (reservation.title.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
    // if (reservation.title.indexOf(filterText) === -1) {
    //   return;
    // }
    rows.push(
      <Favorites favorites={favorite} key={favorite.title} userId={userId} />
    );
  });

  return (
    <div>
      <Button variant="primary" className='btn btn-primary back' id = "favorites-back" onClick={handleBackClick}>Back</Button>
      <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', }}>
        {rows}
      </div>
    </div>

  );
}

export default FavoriteTable