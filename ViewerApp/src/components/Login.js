import React, { useState } from 'react';
import './Login.css'
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // check if username and password are valid
        if (username === 'myusername' && password === 'mypassword') {
            // successful login, redirect to dashboard or home page
            console.log('Successful login');
        } else {
            setError('Invalid username or password');
        }
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
