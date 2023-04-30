import { useState,useRef } from "react";
import Modal from "./Modal"
import './EditProfile.css'
import axios from 'axios'
const EditProfile = (props) => {
    const [username, setUsername] = useState(props.username);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState(props.name)
    const [fullName, setfullName] = useState(props.fullname)
    const [phone, setPhone] = useState(props.tel)
    const [error, setError] = useState('');
    const [image, setImage] = useState(props.img);
    const [editImage, setEditImage] = useState(false)
    const [imageBase64, setImageBase64] = useState('')
    const handleSubmit = async() => {
        const data = {
            username: username,
            name: name,
            password: '111111',
            ConfirmPassword: '111111',
            fullName: fullName,
            phoneNumber: phone,
            image: imageBase64
        }
        console.log(data)
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const formdata = JSON.stringify(data)
        const response = await axios.post('/Account/edit', formdata, config)
        console.log(response)

    }
      const hiddenFileInput = useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
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
  const handleFileChange = (event) => {
      const file = event.target.files[0];
      console.log(file)
    // Do something with the file, such as sending it to a server or displaying it in the UI
      console.log(file);
      convertImageToBase64(file, (base) => {
          setImageBase64(base)
          console.log(base)
          setImage(base)
      })
      
    };
    function Base64ToImage(base64img, callback) {
        var img = new Image();
        img.onload = function () {
            callback(img);
        };
        img.src = base64img;
    }
    return (
        <Modal onClose={props.onClose}>
            <div className="container" >
                <h1>Edit Profile</h1>
                <div>
                    <div className="img-container">
                        <div  className="profile-image-wrapper">
                            <input
                                type="file"
                                ref={hiddenFileInput}
                                onChange={handleFileChange}
                                style={{ display: "none" }}
                            />
                           
                            <img src={image} className="profile-image" /> 
                           
                        </div>
                      
                    </div>
                    <div className='d-flex justify-content-center'>
                        <button onClick={handleClick} className='btn btn-primary' > Edit Picture</button>
                    </div>
                
                    <form  >
                        <div>
                            <div>Username</div>
                            <input className="input"
                                type="text"
                                placeholder=""
                                value={username}
                                onChange={(e) => { setUsername(e.target.value) }}
                            />

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
                        </div>
                        <div>
                            <div>PhoneNumber</div>
                            <input
                                type="tel"
                                className="input"
                                value={phone}
                                onChange={(e) => { setPhone(e.target.value) }}
                            />
                        </div>

                        {error && <p className="error">{error}</p>}


                    </form>
                    <div className="btn-container">
                        <button onClick={handleSubmit} className="button" type="submit">Save</button>
                    </div>
                </div>
            </div>
        </Modal>
        )

}
export default EditProfile