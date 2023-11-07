import { useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import "./UpdateProperty.css";

const UpdateProperty = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const state = JSON.parse(location.state)
    const ownerId = state.userId
    const property = state.details
    console.log('Update Property: ', property)
    console.log('Property Title: ', property.title)

    const handleClick = event => {
        // console.log(property)
        navigate('/PropertyDetails', {state:{property, ownerId}})
      };

    const handleUpdate = event => {
        event.preventDefault();
        console.log("clicked");
        fetch("http://localhost:3000/properties/" + property._id, {
            method: "PATCH",
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
                // img: document.getElementById("img").value,
                img: "img/" + document.getElementById("img").files[0].name,
                star: document.getElementById("star").value,
                availableDate: document.getElementById("availableDate").value,
                address: document.getElementById("address").value,
                owner_id:ownerId,
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
                alert("Updating Property successful");
                navigate('/')
            })
            .catch(console.log);
    };

    return (
        <div className="container">
            <div className="signup-content">
                <div className="signup-form">
                    <form>
                        <h2>Update Property Form</h2>
                        <div class="form-group">
                            <label for="title">Title</label>
                            <input type="text" name="title" id="title" defaultValue={property.title} />
                        </div>
                        <div class="form-group">
                            <label for="tagline">Tagline</label>
                            <input type="text" name="tagline" id="tagline" defaultValue={property.tagline} />
                        </div>
                        <div class="form-group">
                            <label for="description">Description</label>
                            <input type="text" name="description" id="description" defaultValue={property.description} />
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="nightlyFee">Nightly Fee</label>
                                <input type="text" name="nightlyFee" id="nightlyFee" defaultValue={property.nightlyFee} />
                            </div>
                            <div class="form-group">
                                <label for="cleaningFee">Cleaning Fee</label>
                                <input type="text" name="cleaningFee" id="cleaningFee" defaultValue={property.cleaningFee} />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="serviceFee">Service Fee</label>
                                <input type="text" name="serviceFee" id="serviceFee" defaultValue={property.serviceFee} />
                            </div>
                            <div class="form-group">
                                <label for="bedrooms">Bedrooms</label>
                                <div class="form-select">
                                    <select name="bedrooms" id="bedrooms" defaultValue={property.bedrooms}>
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
                            <label for="amentities">Amentities</label>
                            <input type="text" name="amentities" id="amentities" defaultValue={property.amentities} />
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="type">Type</label>
                                <div class="form-select">
                                    <select name="type" id="type" defaultValue={property.type}>
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
                                <label for="star">Star</label>
                                <input type="text" name="star" id="star" defaultValue={property.star} />
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="address">Address</label>
                            <textarea id="address" name="address" class="form-control" defaultValue={property.address}></textarea>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="availableDate">Available Date</label>
                                <input type="date" name="availableDate" id="availableDate" defaultValue={property.availableDate} />
                            </div>

                            {/* <div class="form-group">
                                <label for="owner_id">Owner Id :</label>
                                <input type="text" name="owner_id" id="owner_id" />
                            </div> */}
                        </div>

                        <input type="checkbox" name="available" id='available' defaultChecked={property.available ? true : false} /> Available

                        <div class="form-group">
                            <label for="img">Select Image</label>
                            <input type="file" id="img" name="img" accept="image/*"/>
                        </div>

                        <br />
                        <div class="back">
                            <button type="submit" id="back" class="btn btn-outline-dark" onClick={handleClick}>Back</button>
                        </div>
                        <br />
                        <div class="form-submit">
                            <button type="submit" id="add" class="btn btn-outline-dark" onClick={handleUpdate}>Update</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateProperty
