import React from 'react'
// import Carousel from './Carousel/Carousel';

const Jumbotron = () => {
  return (
    <div className="jumbotron rounded-0">
      <div className="jumbotron-image-div container-fluid text-center">
      <img className="jumbotron-image" src="img/Parasio-palm-removebg.png" width="500" height="250"
          alt="Paraiso Logo"/>
          </div>
    {/* <Carousel /> */}
      {/* <div className="container-fluid search-bar">
        <form className="search-bar-form">
          <input type="text" className="search" placeholder="Destination" required />
          <input type="text" className="date-from" placeholder="Check In" required />
          <input type="text" className="date-to" placeholder="Check Out" required />
          <input type="text" className="number-of-people" placeholder="Number of People" required />
          <button type="submit" className="button search-button"><i className="bi bi-search fa-2x"></i></button>
        </form>
      </div> */}
    </div>
  )
}

export default Jumbotron
