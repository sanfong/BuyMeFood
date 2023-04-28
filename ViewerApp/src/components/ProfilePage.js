import React from 'react';
import './ProfilePage.css';
import { FaPhoneAlt } from 'react-icons/fa';
import { FiCreditCard } from 'react-icons/fi';
//ถ้าเปิดไม่ได้แสดงว่ายังไม่ได้ติดตั้ง npm install react-icons//

const ProfilePage = (props) => {
    const { img, name, fullname, tel, bcredit, ccredit } = props;

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-image-wrapper">
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
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
