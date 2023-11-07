import React from 'react'

const NavBar = () => {
  return (
    <nav className="navbar navbar-default fixed-top navbar-expand-lg bg-dark navbar-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/"><img src="img/Parasio-palm-removebg.png" width="120" height="50"
          alt="Paraiso Logo" /></a>
          
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
          aria-controls="navbarCollapse" aria-expanded="true" aria-label="Toggle navigation" style={{color: 'aliceblue'}}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link active" href="/">Home</a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="">About</a>
            </li> */}
            <li className="nav-item">
              <a className="nav-link active" href="/MyReservations">My Reservations</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="/MyFavorites">Favorites</a>
            </li>
          </ul>
          <div className="nav-item dropdown ml-auto" style={{marginRight: '20px'}}>
            <a className="nav-link profile-icon" href="#" id="navbarDropdownMenuLink" style={{color:'white'}} data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false"><i className="bi bi-person-circle fa-lg"></i> Profile</a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a className="dropdown-item" href="/Login">Login</a>
              <a className="dropdown-item" href="/Register">Sign Up</a>
            </div>
          </div>
        </div>

      </div>
    </nav>

  );
}

export default NavBar

