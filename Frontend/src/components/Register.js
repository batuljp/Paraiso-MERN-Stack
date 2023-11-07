import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Register.css";
import React from 'react';

// import NavBar from './components/NavBar';
// import Footer from './components/Footer';
// import Jumbotron from './components/Jumbotron';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [host, setHost] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    

    const req = await fetch("http://localhost:3000/users/Register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: await JSON.stringify({
            name,
            email,
            password,
            host,
        }),
    });

    const data = await req.json();

    if (data.status == "ok") {
        navigate("/Login");
        alert("New User Registered!")
    } else {
        alert("Duplicate Email");
    };
  };
  return (
    <div className='register-page'>
        <form onSubmit={handleRegister} className = "register-form">
            <h2 className='register-title'>Register</h2>
            <div>
            <label >Username: [only alphanumeric characters]</label>
            <input 
                placeholder='Username'
                type="text" 
                id="name"
                required 
                pattern="^[A-Za-z0-9]+$"
                value={name} 
                onChange={(e) => setName(e.target.value)} 
            />
            </div>
            <div>
            <label >Email: [like abc@def.xyz] </label>
            <input 
                placeholder='Email' 
                type="email" 
                id = "email"
                required
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />
            </div>
            <label>Password: [at least six characters]</label>
            <input 
                placeholder='Password'
                type="password"
                id="password" 
                required 
                minlength="6"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <br/>
            <label for="host">
                {/* <input 
                    type='hidden' 
                    value={host} 
                    name='host' 
                    unchecked /> */}
                <input 
                    type="checkbox" 
                    // id="host" 
                    // name="host"
                    // value={host == true}
                    onChange={(e) => setHost(true)}
                />
                To be a host
                {/* To be a host?
                <input type="radio" id="host" name="host" value={true}/>Yes
                <input type="radio" id="host" name="host" value={false}/>No */}
            </label>
            <br/>
            <div>
                <button type="submit" className="btn btn-primary" id="register-submit">Register</button>
                <span className="register-subtext"> Already have an account? <Link to="/Login">Login</Link></span>
            </div>
            {/* <div>
            <span className="register-subtext"> Already have an account? <Link to="/Login">Login</Link></span>
            </div> */}
        </form>
    </div>
  );
};

export default Register;