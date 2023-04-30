import { useState } from "react"
import Modal from "./Modal"
import axios from 'axios'
const ChangePass = (props) => {
    const [Pass, setPass] = useState({
        oldPassword: '',
        newPassword:''
    })
    const [confirm, setConfirm] = useState('')

    const handleSubmit = async() => {
        if (Pass.newPassword === confirm) {
            console.log('confim')
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const formdata = JSON.stringify(Pass)
            const response = await axios.put('/Account/edit/password', formdata, config)
            window.location.reload()
            console.log(response)

        }



    }

    return (
        <Modal onClose={props.onClose}>
            <div className="container" >
                <h1>Change Password</h1>
                <div>


                    <form  >
                        <div>
                            <div>Previous Password</div>
                            <input className="input"
                                type="password"
                                placeholder=""
                                value={Pass.oldPassword}
                                onChange={(e) => { setPass({ ...Pass, oldPassword: e.target.value }) }}

                            />

                        </div>


                        <div>
                            <div>New Password</div>
                            <input
                                type="password"
                                className="input"
                                placeholder=""
                                value={Pass.newPassword}
                                onChange={(e) => { setPass({ ...Pass, newPassword: e.target.value }) }}

                            />
                        </div>
                        <div>
                            <div>Confirm Password</div>
                            <input
                                type="password"
                                className="input"
                                placeholder=""
                                value={confirm}
                                onChange={(e) => { setConfirm(e.target.value) }}

                            />
                        </div>




                    </form>
                    <div className="btn-container">
                        <button onClick={handleSubmit} className="button" type="submit">Save</button>
                        <button onClick={props.onClose} className='btn btn-danger mx-4' >Close</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ChangePass