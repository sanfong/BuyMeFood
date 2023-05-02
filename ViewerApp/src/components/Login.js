import React, { useRef, useState,useEffect } from 'react';
import './Login.css'
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/Account')
                if (response.status === 200) {
                    window.location.replace('/')
                }
            } catch (error) {
            
            }
        }

        fetchData()
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
        const formdata = JSON.stringify(data)

        try {
            const response = await axios.post('/Account/login', formdata, config)
            console.log(response)
            if (response.status === 200) {
                window.location.replace('/')
            }
        } catch (error) {
            setError("Invalid username or password")
        }
        const alert = <div class="alert alert-success col-6" role="alert">
            <h3>Success!</h3>
            Your account has been created.
        </div>
        
    };

    return (
        <div className="login-container">

            <div className="login-card shadow-lg">
                <h1 className="title">Login</h1>
                <div className="row">
                    <div className='col-md-6 px-5'>

                        <form onSubmit={handleSubmit} style={{marginTop:'12vh'} } >
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
                        <img src="https://img.freepik.com/premium-vector/fast-food-composition-line-art-concept-flat-cartoon-graphic-design-illustration_133260-3168.jpg?w=826" className="login-image" />
                        <p style={{ color: '#cb7f4c', fontSize:'24px' }}>Welcome back!!</p>
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
