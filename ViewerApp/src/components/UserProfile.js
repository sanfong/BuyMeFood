import Modal from "./Modal";
import './UserProfile.css'
const UserProfile = (props) => {
    return (
        <Modal onClose={props.onClose}>
        

            <div className=" justify-content-center us-container" >
                <div className="d-flex justify-content-center">
                <div className="profile-image-wrapper">

                    <img src={props.user.image}  className="profile-image" />
                </div></div>
                <div className="profile-details">
                    <div className="profile-name">Name : {props.user.name}</div>
                    <div className="profile-name">Full Name : {props.user.fullName}</div>
                    <div className="profile-name">
  
                        <div className="profile-contact-text">Tel : {props.tel}</div>
                    </div>
                    <div className="profile-contact">


                    </div>
                  
                </div>
            </div>
      
            
        </Modal>

    );
}
export default UserProfile