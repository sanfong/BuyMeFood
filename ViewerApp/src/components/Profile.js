import React from 'react';
import ProfilePage from './ProfilePage';

const Profile = () => {
    const DUMMY_PROFLIE = {
        img:'https://s359.thaibuffer.com/pagebuilder/cc3ec7c1-b967-4f5c-841b-af853ccb093f.jpg',
        name: 'แมวดำ',
        fullname: 'แมวดำ ขมปี๋',
        tel: '0123456789',
        bcredit: 555,
        ccredit:222
    };
    return (
        <div >
            <ProfilePage{...DUMMY_PROFLIE }/>
        </div>

    )

}
export default Profile