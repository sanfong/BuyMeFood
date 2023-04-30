import React, { useState,useEffect } from 'react';
import ProfilePage from './ProfilePage';
import axios from 'axios'
const Profile = () => {
    const [profile, setProfile] = useState({})
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/Account')
                if (response.status === 200) {
                    console.log(response.data)
                    setProfile(response.data)
                }
            } catch (error) {
                console.error(error)
                window.location.replace('/')
            }
        }

        fetchData()
    }, [])
    const PROFLIE = {
        img:'https://s359.thaibuffer.com/pagebuilder/cc3ec7c1-b967-4f5c-841b-af853ccb093f.jpg',
        name: profile.name,
        fullname: profile.fullName, 
        tel: profile.phoneNumber,
        bcredit: 555,
        ccredit: 222,
        username: profile.username
    };
    return (
        <div >
            <ProfilePage{...PROFLIE }/>
        </div>

    )

}
export default Profile