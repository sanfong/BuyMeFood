import React, { useRef, useState,useEffect, useLayoutEffect } from 'react';
import './Login.css'
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'
import burger from '../Assets/Burger.png'
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    useEffect(() => {
        // fetchData
        axios.get('/Account').then(() => { window.location.replace('/') }).catch(() => { })
    }, [])

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

        axios.post('/Account/login', JSON.stringify(data), config)
            .then(() => { window.location.replace('/') })
            .catch(() => { setError("Invalid username or password") })
    };

    return (
        <div className="login-container">

            <div className="login-card shadow-lg">
                <h1 className="title">Login</h1>
                <div className="row">
                    <div className='col-md-6 px-5'>

                        <form onSubmit={handleSubmit} style={{marginTop:'7vh'} } >
                            <div >
                                <div>Username</div>
                                <input className="input"
                                    type="text"
                                    placeholder=""
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                />

                            </div>

                            <div>
                                <div className="up">Password</div>
                                <input
                                    style={{ marginBottom:'0px' }}
                                    type="password"
                                    className="input"
                                    placeholder=""
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                                
                            </div>
                            <div style={{ position: 'absolute' }}>{error && <p className="error">{error}</p>}</div>       
                        </form>
                    </div>
                    <div className='col-md-6 d-none d-md-block img-contianer'>
                        <img src={burger} className="login-image" />
                        
                    </div>
                </div>
                <div className="linker mb-2 pb-0">
                    <p className=" mb-0 pb-0">New to this site ? </p>
                    <NavLink tag={Link} className="text-danger mx-2" to="/signup"> Sign Up</NavLink>
                </div>
                <div className="btn-container" >
                    <button onClick={handleSubmit} className="button mt-0">Login</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
