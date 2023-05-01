import Modal from "./Modal";

const UserProfile = (props) => {
    return (
        <Modal onClose={props.onClose}>
        

            <div className=" d-flex justify-content-center" >
                <div className="profile-image-wrapper">

                    <img src={props.user.image}  className="profile-image" />
                </div>
                <div className="profile-details">
                    <div className="profile-name">{props.user.name}</div>
                    <div className="profile-fullname">{props.user.fullName}</div>
                    <div className="profile-contact">
  
                        <div className="profile-contact-text">{props.tel}</div>
                    </div>
                    <div className="profile-contact">


                    </div>
                  
                </div>
            </div>
      
            
        </Modal>

    );
}
export default UserProfile