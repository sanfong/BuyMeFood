import React, { useState } from 'react';
import './ProfilePage.css';
import { FaPhoneAlt } from 'react-icons/fa';
import { FiCreditCard } from 'react-icons/fi';
import EditProfile from './EditProfile';
import ChangePass from './ChangePass';
//ถ้าเปิดไม่ได้แสดงว่ายังไม่ได้ติดตั้ง npm install react-icons//

const ProfilePage = (props) => {
    const { img, name,username, fullname, tel, bcredit, ccredit } = props;
    const [editProfile, setEditProfile] = useState(false)
    const [changePassword, setChangePassword] = useState(false)

    return (
        <div className="profile-container">
            {editProfile && <EditProfile{...props} onClose={() => {
                setEditProfile(false)

            }} />}

            {changePassword && <ChangePass onClose={() => { setChangePassword(false) }} />}
            <div className="profile-card">
                <div  className="profile-image-wrapper">
                   
                    <img src={img} alt={name} className="profile-image" />
                </div>
                <div className="profile-details">
                    <div className="profile-name">{name}</div>
                    <div className="profile-fullname">{fullname}</div>
                    <div className="profile-contact">
                        <FaPhoneAlt className="profile-contact-icon" />
                        <div className="profile-contact-text">{tel}</div>
                    </div>
                    <div className="profile-contact">


                    </div>
                    <button onClick={() => { setEditProfile(true) }} className="btn btn-success">Edit Profile</button>
                    <button onClick={() => { setChangePassword(true) }} className="btn btn-warning">Change Password</button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
