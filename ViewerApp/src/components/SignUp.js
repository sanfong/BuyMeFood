import React, { useRef, useState } from 'react';
import './Login.css'
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'
// npm install axios

const SignUp = () => {
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
        image: null
    });
    const [image, setImage] = useState(null);
    const [usernameError, setUsernameError] = useState('');
    const [PasswordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [nameError, setnameError] = useState('');
    const [fullNameError, setfullNameError] = useState('');
    const [phoneError, setphoneError] = useState('');
    const [imageError, setimageError] = useState('');

    const validateUsername = (value) => {
        const regex = /^[a-zA-Z0-9_]+$/;
        if (!value) {
            setUsernameError("Username is required");
        }
        else if (value.length < 4) {
            setUsernameError("The username must be 4–16 characters long.");
        }
        else if (value.length > 16) {
            setUsernameError("The username must be 4–16 characters long.");
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
            image: image

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
                    setUsernameError(errorResponse.errors.username)
                    setPasswordError(errorResponse.errors.Password)
                    setConfirmPasswordError(errorResponse.errors.ConfirmPassword)
                    setnameError(errorResponse.errors.name)
                    setfullNameError(errorResponse.errors.fullName)
                    setphoneError(errorResponse.errors.phone)
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
    const handleFileInputChange = (e) => {
        convertImageToBase64(e.target.files[0], (base) => { setImage(base) })
    };
    function convertImageToBase64(file, callback) {
        var reader = new FileReader();
        reader.onload = function () {
            var dataURL = reader.result;
            var canvas = document.createElement('canvas');
            var img = new Image();
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                var ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                var dataURL = canvas.toDataURL('image/jpeg');
                callback(dataURL);
            };
            img.src = dataURL;
        };
        reader.readAsDataURL(file);
    }
    function Base64ToImage(base64img, callback) {
        var img = new Image();
        img.onload = function () {
            callback(img);
        };
        img.src = base64img;
    }
    if (success) {

        return (
            window.location.replace('/login')
        )

    } else {
        return (
            <div className="login-container">
                <div className="login-card" style={{ height: '50vh' }}>
                    <h1 className="title">Sign Up</h1>

                    <div className="row">
                        <div className='col-md-6'>
                        </div>
                        <div className='col-md-6 px-5'>

                            <form onSubmit={handleSubmit} >
                                <div>
                                    <div>Username</div>
                                    <input className="input mb-2"
                                        type="text"
                                        placeholder=""
                                        value={username}
                                        onChange={(e) => { validateUsername(e.target.value) }}
                                    />

                                    <div className='mt-0 pt-0 mb-2' style={{ position: 'relative' }}>{usernameError && <p className="error pt-0 mt-0 pb-0">{usernameError}</p>}</div>
                                    
                                </div>

                                <div>
                                    <div>Password</div>
                                    <input
                                        type="password"
                                        className="input"
                                        placeholder=""
                                        value={password}
                                        onChange={(e) => { validatePassword(e.target.value) }}
                                    />
                                    {PasswordError && <p className="error">{PasswordError}</p>}
                                </div>
                                <div>
                                    <div>Confirm Password</div>
                                    <input
                                        type="password"
                                        className="input"
                                        placeholder=""
                                        value={confirmPassword}
                                        onChange={(e) => { validateConfirmPassword(e.target.value) }}
                                    />
                                    {confirmPasswordError && <p className="error">{confirmPasswordError}</p>}
                                </div>
                                <div>
                                    <div>Name</div>
                                    <input
                                        type="text"
                                        className="input"
                                        value={name}
                                        onChange={(e) => { validateName(e.target.value) }}
                                    />
                                    {nameError && <p className="error">{nameError}</p>}
                                </div>
                                <div>
                                    <div>Full Name</div>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder=""
                                        value={fullName}
                                        onChange={(e) => { validateFullName(e.target.value) }}
                                    />
                                    {fullNameError && <p className="error">{fullNameError}</p>}
                                </div>
                                <div>
                                    <div>Phone Number</div>
                                    <input
                                        type="tel"
                                        className="input"
                                        value={phone}
                                        onChange={(e) => { validatePhoneNumber(e.target.value) }}
                                    />
                                    {phoneError && <p className="error">{phoneError}</p>}
                                </div>


                                <div className="linker">
                                    <p>Already have account ? </p>

                                    <NavLink tag={Link} className="text-danger mx-3" to="/login">Log In</NavLink>

                                </div>


                                <div className="btn-container">
                                    <button className="button" type="submit">Sign Up</button>
                                </div>

                            </form>
                        </div>




                    </div>

                   
                </div>
            </div>
        );
    }
};
export default SignUp;
