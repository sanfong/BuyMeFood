﻿import React, { useRef, useState } from 'react';
import './Login.css'
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const handleSubmit = async (event) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        event.preventDefault();
        const data = {
            username: username,
            password: password
        }
        const formdata = JSON.stringify(data)

        const response = await axios.post('/Account/login', formdata,config)
        console.log(response)  
        
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="title">Login</h1>
                <form onSubmit={handleSubmit} >
                    <div>
                  <div>Username</div>
                  <input className="input"
                        type="text"
                        placeholder=""
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />

                    </div>

                    <div>
                        <div>Password</div>
                    <input
                        type="password"
                        className="input"
                        placeholder=""
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    </div>

                    <div className="linker">
                        <p>New to this site ? </p>
                  
                        <NavLink tag={Link} className="text-dark" to="/signup">Sign Up</NavLink>
                        
                    </div>
                    {error && <p className="error">{error}</p>}
                    <div className="btn-container">
                        <button className="button" type="submit">Login</button>
                    </div>
                    
                </form>
            </div>
        </div>
    );
};

export default Login;
