import { useState } from "react"
import Modal from "./Modal"
import axios from 'axios'
import './ChangePass.css'

const ChangePass = (props) => {
    const [Pass, setPass] = useState({
        oldPassword: '',
        newPassword: ''
    })
    const [confirm, setConfirm] = useState('')
    const [isErr, setIsErr] = useState(false)
    const [isWronPass, setIsWrongPass] = useState(false)
    const errMsg = {
        prevblank: 'กรุณาระบุรหัสผ่านเดิม',
        prevwrong: 'รหัสผ่านไม่ถูกต้อง',
        newblank: 'กรุณาระบุรหัสผ่านใหม่',
        newwrong: 'รหัสผ่านต้องมีความยาวมากกว่า 6 ตัวอักษร',
        confirm: 'รหัสผ่านไม่ตรงกัน'
    }
    const handleSubmit = async () => {
        if (Pass.newPassword.length < 6 || Pass.oldPassword.trim === '' || Pass.newPassword.trim() === '' || Pass.newPassword !== confirm) {
            setIsErr(true)
            return

        }


        if (Pass.newPassword === confirm) {
            console.log('confirm')
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const formdata = JSON.stringify(Pass)

            try {
                const response = await axios.put('/Account/edit/password', formdata, config)
                window.location.reload()
                console.log(response.status)
            } catch (err) {
                setIsErr(true)
                if (err.response.status === 401) {
                    console.log('You are not logged in.')
                    window.location.reload()
                }
                setIsWrongPass(true)
            }


        }


    }

    return (
        <Modal onClose={props.onClose}>
            <div className="container-change-password or-color" >
                <h1>Change Password</h1>
                <div>


                    <form  >
                        <div>
                            <div className="edit-text">Previous Password</div>
                            <input className="input edit-input"
                                type="password"
                                placeholder=""
                                value={Pass.oldPassword}
                                onChange={(e) => { setPass({ ...Pass, oldPassword: e.target.value }) }}

                            />
                            {Pass.oldPassword.trim() === '' && isErr && <p className="text-danger">{errMsg.prevblank}</p>}
                            {Pass.oldPassword.trim() !== '' && isErr && isWronPass && <p className="text-danger">{errMsg.prevwrong}</p>}
                        </div>


                        <div>
                            <div className="edit-text">New Password</div>
                            <input
                                type="password"
                                className="input edit-input"
                                placeholder=""
                                value={Pass.newPassword}
                                onChange={(e) => { setPass({ ...Pass, newPassword: e.target.value }) }}

                            />
                            {Pass.newPassword.trim() === '' && isErr && <p className="text-danger">{errMsg.newblank}</p>}
                            {Pass.newPassword.trim() !== '' && Pass.newPassword.trim().length < 6 && isErr && <p className="text-danger">{errMsg.newwrong}</p>}
                        </div>
                        <div>
                            <div className="edit-text">Confirm Password</div>
                            <input
                                type="password"
                                className="input edit-input"
                                placeholder=""
                                value={confirm}
                                onChange={(e) => { setConfirm(e.target.value) }}

                            />
                            {Pass.newPassword !== confirm && isErr && <p className="text-danger">{errMsg.confirm}</p>}
                        </div>




                    </form>
                    <div className="button-container">
                        <button onClick={handleSubmit} className="button" type="submit">Save</button>
                        <button onClick={props.onClose} className='btn btn-danger mx-4' >Close</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ChangePass