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

    const validatePassword = (value) => {
        if (value.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
        } else {
            setPasswordError('');
        }
        setPassword(value);
    }

    
    const validatePhone = (value) => {
        const isPhoneNumeric = /^\d+$/.test(value);
        if (!isPhoneNumeric) {
            setphoneError('Password must be a number');
        } else {
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
            image:image

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
    if (!success) {
        return (
            <div className="success-message">
                <h2>Success!</h2>
                <p>Your account has been created. Please <Link to="/login">log in</Link> to continue.</p>

            </div>
        )

    }else {
        return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="title">Sign Up</h1>
                <form onSubmit={handleSubmit} >
                    <div>
                        <div>Username</div>
                        <input className="input"
                            type="text"
                            placeholder=""
                            value={username}
                            onChange={(e) => { setUsername(e.target.value) }}
                        />
                        {usernameError && <p className="error">{usernameError}</p>}
                       

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
                            onChange={(e) => { setConfirmPassword(e.target.value) }}
                        />
                        {confirmPasswordError && <p className="error">{confirmPasswordError}</p>}
                    </div>
                    <div>
                        <div>Name</div>
                        <input
                            type="text"
                            className="input"
                            placeholder=""
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
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
                            onChange={(e) => { setfullName(e.target.value) }}
                        />
                        {fullNameError && <p className="error">{fullNameError}</p>}
                    </div>
                    <div>
                        <div>PhoneNumber</div>
                        <input
                            type="tel"
                            className="input"
                            value={phone}
                            onChange={(e) => { validatePhone(e.target.value) }}
                        />
                        {phoneError && <p className="error">{phoneError}</p>}
                    </div>


                    <div className="linker">
                        <p>Already have account ? </p>

                        <NavLink tag={Link} className="text-dark" to="/login">Log In</NavLink>

                    </div>
                    
                    
                    <div className="btn-container">
                        <button className="button" type="submit">Sign Up</button>
                    </div>

                </form>
            </div>
        </div>
    );


    }
    
};
export default SignUp;
