import React, { useState } from 'react';
import './ProfilePage.css';
import { FaPhoneAlt } from 'react-icons/fa';
import { FiCreditCard } from 'react-icons/fi';
import EditProfile from './EditProfile';
//ถ้าเปิดไม่ได้แสดงว่ายังไม่ได้ติดตั้ง npm install react-icons//

const ProfilePage = (props) => {
    const { img, name,username, fullname, tel, bcredit, ccredit } = props;
    const [editProfile, setEditProfile] = useState(false)
    return (
        <div className="profile-container">
            <div className="profile-card">
                <div  className="profile-image-wrapper">
                    {editProfile && <EditProfile{...props} onClose={() => {  setEditProfile(false) }} />}
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
                        <FiCreditCard className="profile-contact-icon" />
                        <div className="profile-contact-text">
                            Buyer Credit: {bcredit} | Customer Credit: {ccredit}
                        </div>
                    </div>
                    <button onClick={() => { setEditProfile(true) }} className="btn btn-success">Edit Profile</button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
