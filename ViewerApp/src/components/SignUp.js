﻿import React, { useEffect, useRef, useState } from 'react';
import './SignUp.css'
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'
import noodle from '../Assets/noodle.png'
// npm install axios
const defaultImage = "data:image/png;base64,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"
const SignUp = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [fullName, setfullName] = useState('')
    const [phone, setPhone] = useState('')
    const [success, setSuccess] = useState(false);

    const [error, setError] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        name: '',
        fullName: '',
        phone: '',
        image: defaultImage
    });

    const [usernameError, setUsernameError] = useState('');
    const [PasswordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [nameError, setnameError] = useState('');
    const [fullNameError, setfullNameError] = useState('');
    const [phoneError, setphoneError] = useState('');


    const validateUsername = (value) => {
        const regex = /^[a-zA-Z0-9_]+$/;
        if (!value) {
            setUsernameError("Username is required");
        }
        else if (value.length < 4 || value.length > 16) {
            setUsernameError("The username must be 4-16 characters long.");
        }
        else if (!regex.test(value)) {
            setUsernameError("Username can only contain letters, numbers, and underscores");
        }
        else {
            setUsernameError("");
        }
        setUsername(value);
    };

    const validateName = (value) => {
        const regex = /^[a-zA-Z]+$/;
        if (!regex.test(value)) {
            setnameError('Name must contain only letters');
        } else {
            setnameError('');
        }
        setName(value);
    }


    const validateFullName = (value) => {
        const regex = /^[a-zA-Z\s]*$/; // เช็คว่าเป็นตัวอักษรเท่านั้น
        if (!value || value === '') {
            setfullNameError('Please enter your full name');
        }
        else if (!regex.test(value)) {
            setfullNameError('Full name must contain only letters and spaces');
        }
        else {
            setfullNameError('');
        }
        setfullName(value);
    };

    const validatePassword = (value) => {
        if (!value) {
            setPasswordError('Password is required');
        }
        else if (value.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
        }
        else {
            setPasswordError('');
        }
        setPassword(value);
    }

    const validateConfirmPassword = (value) => {
        if (!value) {
            setConfirmPasswordError('Confirm Password is required');
        }
        else if (value.length < 6) {
            setConfirmPasswordError('Confirm Password must be at least 6 characters long');
        }
        else {
            setConfirmPasswordError('');
        }
        setConfirmPassword(value);
    }

    const validatePhoneNumber = (value) => {
        if (!value) {
            setphoneError('Phone number is required');
        }
        else if (!/^[0-9]+$/.test(value)) {
            setphoneError('Phone number must be a number');
        }
        else if (value.length < 9 || value.length > 10) {
            setphoneError('Phone number must be between 9 and 10 digits long');
        }
        else {
            setphoneError('');
        }
        setPhone(value);
    }



    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            username: username,
            password: password,
            confirmPassword: confirmPassword,
            name: name,
            fullName: fullName,
            phoneNumber: phone,
            image: defaultImage

        }
        console.log(data)
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            return;
        }
        const formdata = JSON.stringify(data)
        try {
            const response = await axios.post('/Account/register', formdata, config)
            console.log(response)
            //console.log(response.data.errors)
            if (response.status === 201) {
                setSuccess(true);

            }
        } catch (error) {
            if (error.response) {

                const errorResponse = error.response.data;
                console.log(error.response.data.errors);
                if (errorResponse.errors) {
                    //const errorMessages = Object.values(errorResponse.errors).flatMap((val) => val);
                    setUsernameError(errorResponse.errors.Username)
                    setPasswordError(errorResponse.errors.Password[0])
                    setConfirmPasswordError(errorResponse.errors.ConfirmPassword)
                    setnameError(errorResponse.errors.Name)
                    setfullNameError(errorResponse.errors.FullName)
                    setphoneError(errorResponse.errors.PhoneNumber[0])
                    //setError(errorMessages);
                    console.log(errorResponse.errors.Name);
                } else {
                    setError([errorResponse.message]);
                }
            } else {
                setError(['An unexpected error occurred.']);
            }
        }


    };
 
    useEffect(() => {
        if (success === true) {
            setTimeout(() => {
                window.location.replace('/login')

            }, 3000)

        }


    }, [success])
    return (

        <div className="signup-container">
            {success && <div className="d-flex alert alert-success alert-dismissible fade show " role="alert" style={{ position: 'absolute', top: '100px' }}>
                <strong>Sign up success </strong> <p>: redirecting to log In page</p>

                </div>} 
                <div className="signup-card " >
                    <h1 className="title mb-2">Sign Up</h1>

                    <div className="row">
                    <div className='col-md-6 d-none d-md-block align-middle img-contianer'>
                        <img src={noodle} className="signup-image" />
                        </div>
                        <div className='col-md-6 px-5'>

                            <form onSubmit={handleSubmit} >
                                <div>
                                    
                                        <div>Username</div>
                                        <input className="input mb-0"
                                            type="text"
                                            placeholder=""
                                            value={username}
                                            onChange={(e) => { validateUsername(e.target.value) }}
                                    />
                                    
                                    <div className='mt-0 pt-0 mb-0' style={{ position: 'relative' }}>{usernameError && <p className="error pt-0 mt-0 pb-0 mb-0">{usernameError}</p>}</div>
                                </div>

                                <div>
                                    
                                    <div >Password</div>
                                    <input
                                        type="password"
                                        className="input mb-0"
                                        placeholder=""
                                        value={password}
                                        onChange={(e) => { validatePassword(e.target.value) }}
                                    />
                                    {PasswordError && <p className="error mb-0">{PasswordError}</p>}
                                </div>
                                <div>
                                    <div>Confirm Password</div>
                                    <input
                                        type="password"
                                        className="input mb-0"
                                        placeholder=""
                                        value={confirmPassword}
                                        onChange={(e) => { validateConfirmPassword(e.target.value) }}
                                    />
                                    {confirmPasswordError && <p className="error mb-0">{confirmPasswordError}</p>}
                                </div>
                                <div>
                                    <div>Name</div>
                                    <input
                                        type="text"
                                        className="input mb-0"
                                        value={name}
                                        onChange={(e) => { validateName(e.target.value) }}
                                    />
                                    {nameError && <p className="error mb-0">{nameError}</p>}
                                </div>
                                <div>
                                    <div>Full Name</div>
                                    <input
                                        type="text"
                                        className="input mb-0"
                                        placeholder=""
                                        value={fullName}
                                        onChange={(e) => { validateFullName(e.target.value) }}
                                    />
                                    {fullNameError && <p className="error mb-0">{fullNameError}</p>}
                                </div>
                                <div>
                                    <div>Phone Number</div>
                                    <input
                                        type="tel"
                                        className="input mb-0"
                                        value={phone}
                                        onChange={(e) => { validatePhoneNumber(e.target.value) }}
                                    />
                                    {phoneError && <p className="error mb-0">{phoneError}</p>}
                                </div>




                        </form>
                    </div>




                </div>
                <div className="linker">

                    <p>Already have account ? </p><NavLink tag={Link} className="text-danger mx-3" to="/login">Log In</NavLink>


                </div>


                <div className="btn-container">
                    <button className="button" type="submit">Sign Up</button>
                </div>

            </div>
        </div>
    );
}

export default SignUp;
