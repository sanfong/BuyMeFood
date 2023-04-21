import React from 'react';

const ProfilePage = (props) => {
    const { img,name,fullname,tel,bcredit,ccredit}= props;

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '20px',
            borderRadius: '5px',
            padding: '5%',
}}>
            <div style={{
                flex: '1', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                marginRight: '20px',
            }}>
                <div style={{
                    width: '14rem',
                    borderRadius: '100%',
                    overflow: 'hidden',
                    }}>
                    <img src={img} style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }} />
                </div>
                
            </div>
            <div style={{ flex: '2' }}>
                <h1> Name: {name}</h1>
                <h2> Fullname : {fullname}</h2>
                <h2>Tel: {tel}</h2>
                <h2>Buyer Credit: {bcredit}</h2>
                <h2>Customer Credit: {ccredit}</h2>
            </div>
            
            
        </div>
    );
};

export default ProfilePage;