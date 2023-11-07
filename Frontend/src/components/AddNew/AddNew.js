import { useState } from 'react'
import { redirect, useNavigate, useLocation } from "react-router-dom";
import "./AddNew.css";

const AddNew = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const ownerId = location.state;

    const handleClick = event => {
        navigate('/', { state: ownerId });
    };

    const handleAddNew = event => {
        event.preventDefault();
        console.log("clicked");
        fetch("http://localhost:3000/properties/AddNew", {
            method: "POST",
            body: JSON.stringify({
                title: document.getElementById("title").value,
                tagline: document.getElementById("tagline").value,
                description: document.getElementById("description").value,
                nightlyFee: document.getElementById("nightlyFee").value,
                cleaningFee: document.getElementById("cleaningFee").value,
                serviceFee: document.getElementById("serviceFee").value,
                amentities: document.getElementById("amentities").value,
                type: document.getElementById("type").value,
                bedrooms: document.getElementById("bedrooms").value,
                img: "img/" + document.getElementById("img").files[0].name,
                star: document.getElementById("star").value,
                availableDate: document.getElementById("availableDate").value,
                owner_id: ownerId,
                address: document.getElementById("address").value,
                available: document.getElementById("available").checked
            }),
            headers: {
                "Content-type": "application/json",
            },
        })
            // Converting received data to JSON
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                alert("Added New Prop successful");
                navigate('/', {state: ownerId})
            })
            .catch(console.log);
    };

    return (
        <div class="container">
            <div class="signup-content">
                <div class="signup-form">
                    <form>
                        <h2>New Property Form</h2>
                        <div class="form-group">
                            <label for="title">Title :</label>
                            <input type="text" name="title" id="title" required/>
                        </div>
                        <div class="form-group">
                            <label for="tagline">Tagline :</label>
                            <input type="text" name="tagline" id="tagline" />
                        </div>
                        <div class="form-group">
                            <label for="description">Description :</label>
                            <input type="text" name="description" id="description" />
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="nightlyFee">NightlyFee :</label>
                                <input type="text" name="nightlyFee" id="nightlyFee" />
                            </div>
                            <div class="form-group">
                                <label for="cleaningFee">CleaningFee :</label>
                                <input type="text" name="cleaningFee" id="cleaningFee" />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="serviceFee">ServiceFee :</label>
                                <input type="text" name="serviceFee" id="serviceFee" />
                            </div>
                            <div class="form-group">
                                <label for="bedrooms">Bedrooms :</label>
                                <div class="form-select">
                                    <select name="bedrooms" id="bedrooms" >
                                        <option value=""></option>
                                        <option value="1"> 1 </option>
                                        <option value="2"> 2 </option>
                                        <option value="3"> 3 </option>
                                        <option value="4"> 4 </option>
                                        <option value="5"> 5 </option>
                                    </select>
                                    <span class="select-icon"><i class="zmdi zmdi-chevron-down"></i></span>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="amentities">Amentities :</label>
                            <input type="text" name="amentities" id="amentities" />
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="type">Type :</label>
                                <div class="form-select">
                                    <select name="type" id="type" required>
                                        <option value=""></option>
                                        <option value="Countryside"> Countryside </option>
                                        <option value="Cabins"> Cabins </option>
                                        <option value="Arctic"> Arctic </option>
                                        <option value="Mansions"> Mansions </option>
                                        <option value="Towers"> Towers </option>
                                    </select>
                                    <span class="select-icon"><i class="zmdi zmdi-chevron-down"></i></span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="star">Star :</label>
                                <input type="text" name="star" id="star" />
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="address">Address :</label>
                            <textarea id="address" name="address" class="form-control" ></textarea>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="availableDate">
                                    AvailableDate :
                                </label>
                                <input type="date" name="availableDate" id="availableDate" />
                            </div>

                            {/* <div class="form-group">
                                <label for="owner_id">Owner Id :</label>
                                <input type="text" name="owner_id" id="owner_id" />
                            </div> */}
                        </div>

                        <div class="form-row">
                            <label for="available"> 
                                <input type="checkbox" name="available" id='available' class="checkbox" defaultChecked={false} /> 
                            Available
                            </label>  
                        </div> 

                        <div class="form-group">
                            <label for="img">Select image :</label>
                            <input type="file" id="img" name="img" accept="image/*" />
                        </div>
  
                        <br/>

                        <div class="back">
                            <button type="submit" id="back" class="btn btn-outline-dark" onClick={handleClick}>Back</button>
                        </div>

                        <br/>
                        <div class="form-submit">
                            <button type="submit" id="add" class="btn btn-outline-dark" onClick={handleAddNew}>Add</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddNew
