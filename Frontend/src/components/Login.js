import {useState} from 'react'
import {useNavigate} from "react-router-dom";
import "./Login.css";
import React from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [host, setHost] = useState(false);
    const [userId, setUserId] = useState("");
    const navigate = useNavigate();

    const handleLogin = async(e) => {
        e.preventDefault();

        const req = await fetch('http://localhost:3000/users/login',{
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body: await JSON.stringify({
                email,
                password,
                host,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log("UserID:",data.userId)
            setUserId(data.userId)
            if(data.status === 'ok'){
                localStorage.setItem('token', data.token);
                console.log(host)
                navigate('/', {state: data.userId});
                alert("Login Successful!")
            }else{
                alert('Wrong Email or Password');
                navigate('/Login')
            }
        });

        // const data = await req.json();
    };
  return (
    <div className='login-page'>
        <form onSubmit={handleLogin} className = "login-form">
            <h2 className='login-title'>Login</h2>
            <div>
            <input 
                placeholder='Email' 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />
            </div>
            <br />
            <div>
            <input 
                placeholder='Password' 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
            />
            </div>
            <br />
            {/* <input type="submit"/> */}
            {/* <div class="item">
                <input 
                    type='hidden' 
                    value={host} 
                    name='host' 
                    unchecked />
                <input 
                    type="checkbox" 
                    id="host" 
                    name="host"
                    value={host}
                    onChange={(e) => setHost(e.target.checked)}
                />
                <label for="host">Login as a host</label>
            </div> */}
            {/* <label for="host">
                <input 
                    type='hidden' 
                    value={host} 
                    name='host' 
                    unchecked />
                <input 
                    type="checkbox" 
                    id="host" 
                    name="host"
                    value={host}
                    onChange={(e) => setHost(e.target.checked)}
                />
                Login as a host
            </label> */}
            <label for="host">
                <input 
                    type='hidden' 
                    value={host} 
                    name='host' 
                    unchecked />
                <input 
                    type="checkbox" 
                    // id="host" 
                    // name="host"
                    // value={host}
                    onChange={(e) => setHost(true)}
                />
                Login as a host
            </label>
            <br/>
            <div>
                <button type="submit" className="btn btn-primary" id="login-submit">
                    Login
                </button>
            </div>
            <br/>     
        </form>
    </div>

  )
}

export default Login;
