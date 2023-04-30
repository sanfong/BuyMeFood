import Modal from "./Modal"
import "./SignupSuccess.css"
import { useEffect, useRef, useState } from "react"

const SignupSuccess = (props) => {
const [displayStatus, setDisplayStatus] = useState(false)

    useEffect(() => {
        if (displayStatus === true) {
            setTimeout(() => {
                setDisplayStatus(false)
                window.location.replace('/login')
            }, 3000)

        }
    }, [displayStatus]);
    return (
        <Modal onClose={props.onClose}>
            {displayStatus && 
                    <div className="card-body">
                        <h5 class="card-title">Success!!</h5>
                        <p class="card-text">Your account has been created.</p>
                    </div>
   }
        </Modal>
    )
}
export default SignupSuccess