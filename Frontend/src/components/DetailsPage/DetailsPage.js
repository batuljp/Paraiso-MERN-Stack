import React, { useState, useEffect, useChangeEffect } from 'react'
import { Card, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './DetailsPage.css'
// import Ratings from '../Rating/rating'

const DetailsPage = () => {
  const location = useLocation();
  const details = location.state.property
  const userId = location.state.userId
  const navigate = useNavigate();
  console.log("Details Page UserId:", userId)
  const [rating, setRating] = useState('')
  const [comment, setComment] = useState('')
  const [feedback, setFeedback] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [star1, setStar1] = useState();
  var Total = 0;

  console.log(details)
  const handleClick = event => {
    navigate('/', { state: userId })
  };

  const handleBooking = event => {
    navigate('/BookingDetails', { state: JSON.stringify({ details, userId }) })
  };

  useEffect(() => {

    setLoading(true);
    fetch('http://localhost:3000/feedback/' + details._id, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        setFeedback(data);
        setLoading(false);

      })
      .catch((error) => {
        console.log(error.message);
        setError(error);
        setLoading(false);

      })
  }, []);

  if (isLoading) {
    return (
      <div>Loading...</div>
    );

  }
  else if (error) {
    return (
      <div>Error: {error.message}</div>

    );
  }

  const handleDelete = event => {
    event.preventDefault();
    console.log("clicked");
    fetch("http://localhost:3000/properties/" + details._id, {
      method: "PATCH",
      body: JSON.stringify({
        title: details.title,
        tagline: details.tagline,
        description: details.description,
        nightlyFee: details.nightlyFee,
        cleaningFee: details.cleaningFee,
        serviceFee: details.serviceFee,
        amentities: details.amentities,
        type: details.type,
        bedrooms: details.bedrooms,
        img: details.img,
        star: details.star,
        availableDate: details.availableDate,
        address: details.address,
        owner_id: userId,
        available: false
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      // Converting received data to JSON
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Deleting Property successful");
        navigate('/', { state: userId })
      })
      .catch(console.log);
  };

  // const handleDelete = event => {

  // event.preventDefault();
  // console.log("event.target.id", details._id);
  // fetch("http://localhost:3000/properties/" + details._id, {
  //   method: "DELETE",
  //   headers: {
  //     "Content-type": "application/json",
  //   },
  // })
  //   .then((response) => response.json())
  //   .then((json) => console.log(json));
  //   alert("Deleting Property successful");
  //   navigate('/')

  // };

  const handleUpdate = event => {
    navigate('/UpdateProperty', { state: JSON.stringify({ details, userId }) })
  };

  // const handleRating = event => {
  //   navigate('/RateProperty', { state: JSON.stringify({ details, userId }) })
  // };

  async function givereview(event) {
    event.preventDefault()

    const response = await fetch('http://localhost:3000/feedback/addreview', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        propertyId: details._id,
        rating: rating,
        comment: comment,
      }),
    })

    const data = await response.json()
    //console.log(data)


    if (data.status === 'ok') {
      alert("Feedback Added!")
    }
    else {
      alert(data.msg);
    }

    // handleUpdateRating()
  }


  const handleUpdateRating = event => {
    // const handleUpdateRating = event => {
    //   event.preventDefault();
    //   console.log("clicked");
    console.log(Total)
    fetch("http://localhost:3000/properties/" + details._id, {
      method: "PATCH",
      body: JSON.stringify({
        title: details.title,
        tagline: details.tagline,
        description: details.description,
        nightlyFee: details.nightlyFee,
        cleaningFee: details.cleaningFee,
        serviceFee: details.serviceFee,
        amentities: details.amentities,
        type: details.type,
        bedrooms: details.bedrooms,
        img: details.img,
        star: Total,
        availableDate: details.availableDate,
        address: details.address,
        owner_id: details.owner_id,
        available: details.available
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      // Converting received data to JSON
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Updating Property successful");
        navigate('/', { state: userId })
      })
      .catch(console.log);
  };









  const handleFavorite = event => {
    event.preventDefault();
    console.log("clicked");
    fetch("http://localhost:3000/favorites/addnewfavorite", {
      method: "POST",
      body: JSON.stringify({
        user_id: userId,
        property_id: details._id,
        title: details.title,
        type: details.type,
        img: details.img,
        star: details.star,
        nightlyFee: details.nightlyFee,
        tagline: details.tagline
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      // Converting received data to JSON
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Added to Favorites successfully");
        navigate('/MyFavorites', { state: userId })
      })
      .catch(console.log);
  };

  return (
    <div className='details'>
      <div className="row">
        <div className="col-sm-5">
          <Card className='card'>
            <Card.Img variant="bottom" src={details.img} className='prop-image' />
          </Card>
          <Card className='info'>
            <Card.Body>
              <Card.Title>{details.title}</Card.Title>
              <Card.Subtitle>
                <span style={{ float: "right" }}>
                  <i className="bi bi-star-fill"></i>
                  {Total = (feedback.reduce((temp, property) => temp + property.rating, 0) / feedback.length).toFixed(2)}
                  {/* {details.star} */}
                </span>
              </Card.Subtitle>
              <Card.Text>
                <p><strong>${details.nightlyFee}</strong> night</p>
                <p>{details.tagline}</p>
                <p>{details.description}</p>
              </Card.Text>
              <Button variant="primary" className='btn btn-primary back' onClick={handleClick}>Back</Button>

            </Card.Body>
          </Card>
        </div>
        <div className="col-sm-7">
          <Card style={{ width: '100%', height: '470px' }}>
            <Card.Body>
              <Card.Title>{details.title}</Card.Title>
              <Card.Text>
              <button type="submit" onClick={handleFavorite}>Add to Favorites</button>
                {/* {userId
                ? '' : (<button type="submit" onClick={handleFavorite}>Add to Favorites</button>)
                } */}
                 {
                  userId
                    ? (<button type="submit" onClick={handleDelete}>Delete Property</button>) : ''}
                {userId
                  ? (<button type="submit" onClick={handleUpdate}>Update Property</button>) : ''}

                {/* <button type="submit" onClick={handleRating}>Rate this Property</button> */}
                <br />
                <p>Amentities Include: {details.amentities}</p>
                <p>Bedrooms Available: {details.bedrooms}</p>
                <p>Per Night: ${details.nightlyFee}</p>
                <table className='table'>
                  <tr>
                    <th colSpan={2}>Charges</th>
                  </tr>
                  <tr>
                    <td>Cleaning</td>
                    <td>${details.cleaningFee}</td>
                  </tr>
                  <tr>
                    <td>Service</td>
                    <td>${details.serviceFee}</td>
                  </tr>
                </table>
              </Card.Text>


              {
                details.available
                  ? (<Button variant="primary" className='btn btn-primary book-details' onClick={handleBooking}>Book</Button>)
                  : 'Note: Unavailable to book.'
              }


            </Card.Body>
          </Card>


        </div>
      </div>
      <div className="row">
        <div className="col-sm-5"><h2 className='text-center'>Property Reviews</h2>
          <hr />
          {feedback.length > 0 ? (
            feedback.map((feedback1, k) => {
              return <> <h6 key={feedback1._id}>&nbsp;&nbsp;Rating: {feedback1.rating} <br /> &nbsp; Comment: {feedback1.comment}
              </h6>

              </>

            })
          ) : (<p> No reviews ! </p>)}
          <Button variant="primary" className='btn btn-primary update-rating' onClick={(e) => setStar1(Total), handleUpdateRating}>Update Rating</Button>
        </div>
        <div className="col-sm-7"><h2 className='text-center'>Rate and Comment on this Property</h2>
          <hr />

          <form onSubmit={givereview}>
            <div style={{ marginLeft: 80 + "px" }}>
              <label>
                Rate (5 - Excellent, 1 - Bad)

                <select value={rating} onChange={(e) => setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </label>
              <br />
              <label>
                Comment
                &nbsp;
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
              </label>

              <br />
              <br />

              <input type="submit" value="Submit" />
            </div>
          </form>
        </div></div>
      {/* <div className='row'><h6>Rating:{ Total = (feedback.reduce((temp, property) => temp + property.rating, 0)/feedback.length).toFixed(2)}</h6></div> */}
    </div>
  )
}

export default DetailsPage
