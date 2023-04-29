import React, { useRef, useState } from 'react';
import './Login.css'
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'
// npm install axios
const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [image, setImage] = useState(null);
    const UserNameRef = useRef()
    const PasswordRef = useRef()
    const ConfirmPasswordRef = useRef()
    const NameRef = useRef()
    const FullNameRef = useRef()
    const PhoneRef = useRef()

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            username: UserNameRef.current.value,
            password: PasswordRef.current.value,
            confirmPassword: PasswordRef.current.value,
            name: NameRef.current.value,
            fullName: FullNameRef.current.value,
            phoneNumber: PhoneRef.current.value,
            image: image

        }
        const datademo = {
            "username": "strsdsdfgsdfgfgisdfgng",
            "password": "string",
            "confirmPassword": "string",
            "name": "string",
            "fullName": "string",
            "phoneNumber": "1234345",
            "image": "string"
        }
        console.log(data)
        const response = await fetch('/Account/select?id=0')

        console.log(response)
        
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
                            ref={UserNameRef}
                        />

                    </div>

                    <div>
                        <div>Password</div>
                        <input
                            type="password"
                            className="input"
                            placeholder=""
                            ref={PasswordRef}
                        />
                    </div>
                    <div>
                        <div>Confirm Password</div>
                        <input
                            type="password"
                            className="input"
                            placeholder=""
                            ref={ConfirmPasswordRef}
                        />
                    </div>
                    <div>
                        <div>Name</div>
                        <input
                            type="text"
                            className="input"
                            placeholder=""
                            ref={NameRef}
                        />
                    </div>
                    <div>
                        <div>Full Name</div>
                        <input
                            type="text"
                            className="input"
                            placeholder=""
                            ref={FullNameRef}
                        />
                    </div>
                    <div>
                        <div>PhoneNumber</div>
                        <input
                            type="tel"
                            className="input"
                            ref={PhoneRef}
                        />
                    </div>
                    <div>
                        <div>Image</div>
                        <input type="file" accept="image/*" onChange={handleFileInputChange} />
                    </div>


                    <div className="linker">
                        <p>Already have account ? </p>

                        <NavLink tag={Link} className="text-dark" to="/login">Log In</NavLink>

                    </div>
                    {error && <p className="error">{error}</p>}
                    <div className="btn-container">
                        <button className="button" type="submit">Sign Up</button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default SignUp;
