import React, { useState, useEffect } from 'react';
import './index.css'
import { Routes, Route } from 'react-router-dom';
import FilterablePropertyTable from './components/FilterablePropertyTable/FilterablePropertyTable';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Jumbotron from './components/Jumbotron';
import SideMenu from './components/SideMenu/SideMenu';
import Carousel from './components/Carousel/Carousel';
import DetailsPage from './components/DetailsPage/DetailsPage';
import ReservationsTable from './components/MyReservations/ReservationsTable';
import BookingDetails from './components/BookingDetails/BookingDetails'
import Register from './components/Register';
import Login from './components/Login';
import AddNew from './components/AddNew/AddNew';
import UpdateProperty from './components/UpdateProperty/UpdateProperty';
import FavoriteTable from './components/MyFavorites/FavoriteTable'

export default function App() {
  const [propertiesData, setPropertiesData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/properties', {
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
        setPropertiesData(data)
        console.log(data)
      })
      .catch(console.log);
  }, []);  

  return (
    <div className='App'>
      <NavBar />
      <Routes>
        <Route path='/' element={
          <>
            <Jumbotron />
            <Carousel />
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-sm-3 gy-10'>
                  <SideMenu />
                </div>
                <FilterablePropertyTable properties={propertiesData} />
              </div>
            </div>
          </>
        } />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Register" element={<Register/>} />
        <Route path='/PropertyDetails' element={<DetailsPage/>} />
        <Route path='/MyReservations' element={<ReservationsTable/>} />
        <Route path='/BookingDetails' element={<BookingDetails/>}/>
        <Route path='/AddNew' element={<AddNew/>}/>
        <Route path='/UpdateProperty' element={<UpdateProperty/>}/>
        <Route path='/MyFavorites' element={<FavoriteTable/>} />
      </Routes>

      <Footer />
    </div>

  );
}