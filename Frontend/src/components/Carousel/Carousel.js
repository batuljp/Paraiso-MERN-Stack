import React from 'react'

const Carousel = () => {
  return (
    <section className="pt-5 pb-5" id="carousel-section">
      <div className="container-fluid">
        <div className="carousel-header">
          <h1>Amenities</h1>
        </div>
        <div className="row">
          {/* Left Button */}
          <div className="col-1">
            <a className="carousel-control-prev" href="#carouselExampleIndicators2" role="button" data-slide="prev">
              <i className="bi bi-arrow-left-circle-fill fa-2x" style={{ color: '#087ba3' }}></i>
            </a>
          </div>

          {/* Amenities Image */}
          <div className="col-10 carousel-card-title">
            <div id="carouselExampleIndicators2" className="carousel slide" data-ride="carousel">

              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="row">
                    {/* Pool */}
                    <div className="col-md-4 mb-3">
                      <div className="card">
                        <img className="card-img-top" alt="Swimming Pool" src="img/amenities-pool.jpg" />
                        <div className="card-body">
                          <h4 className="card-title">Swimming Pool</h4>
                          <p className="card-text">Over 70% of the properties have a pool and a kiddy pool
                            included!</p>
                          <br></br>
                          <a href="#" className="btn btn-primary" style={{ marginLeft: '1%' }}>Visit</a>
                        </div>

                      </div>
                    </div>

                    {/* Gym */}
                    <div className="col-md-4 mb-3">
                      <div className="card">
                        <img className="card-img-top" alt="Gym" src="img/amenities-gym.jpg" />
                        <div className="card-body">
                          <h4 className="card-title">Gym</h4>
                          <p className="card-text">An equipped gym is included in about 30% of the
                            listings.</p>
                          <br></br>
                          <a href="#" className="btn btn-primary" style={{ marginLeft: '1%' }}>Visit</a>
                        </div>
                      </div>
                    </div>

                    {/* Playarea */}
                    <div className="col-md-4 mb-3">
                      <div className="card">
                        <img className="card-img-top" alt="Kids Playarea" src="img/amenities-playarea.jfif" />
                        <div className="card-body">
                          <h4 className="card-title">Playarea</h4>
                          <p className="card-text">Around 55% of the listings have a playarea
                            included or nearby.</p>
                          <br></br>
                          <a href="#" className="btn btn-primary" style={{ marginLeft: '1%' }}>Visit</a>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                <div className="carousel-item">
                  <div className="row">
                    {/* Pet Friendly */}
                    <div className="col-md-4 mb-3">
                      <div className="card">
                        <img className="card-img-top" alt="Pet Friendly Rentals" src="img/amenities-pet.jpg" />
                        <div className="card-body">
                          <h4 className="card-title">Pet Friendly</h4>
                          <p className="card-text">More than 89% rentals have pet friendly living
                            space.</p>
                          <br></br>
                          <a href="#" className="btn btn-primary" style={{ marginLeft: '1%' }}>Visit</a>
                        </div>
                      </div>
                    </div>

                    {/* Laundry Room */}
                    <div className="col-md-4 mb-3">
                      <div className="card">
                        <img className="card-img-top" alt="Washer and Dryer" src="img/amenities-laundry.jpg" />
                        <div className="card-body">
                          <h4 className="card-title">Laundry</h4>
                          <p className="card-text">Washer and Dryer are provided by over 80%
                            properties.</p>
                          <br></br>
                          <a href="#" className="btn btn-primary" style={{ marginLeft: '1%' }}>Visit</a>
                        </div>
                      </div>
                    </div>

                    {/* Car Parking */}
                    <div className="col-md-4 mb-3">
                      <div className="card">
                        <img className="card-img-top" alt="Car Parking Provided" src="img/amenities-car.jpg" />
                        <div className="card-body">
                          <h4 className="card-title">Parking Space</h4>
                          <p className="card-text">Over 90% of the rentals have a designated
                            parking space.</p>
                          <br></br>
                          <a href="#" className="btn btn-primary" style={{ marginLeft: '1%' }}>Visit</a>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Button */}
          <div className="col-1">
            <a className="carousel-control-next" href="#carouselExampleIndicators2" role="button" data-slide="next">
              <i className="bi bi-arrow-right-circle-fill fa-2x" style={{ color: '#087ba3' }}></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Carousel
