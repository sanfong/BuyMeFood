﻿import { useState } from "react"
import Modal from "./Modal"
import axios from 'axios'
import './AddCard.css';
const defaultImage ="data:image/png;base64,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"
const AddCard = (props) => {
    const [detailState, setDetailState] = useState(
        {
            loactionStoreName: "",
            locationPickupName: "",
            exprTimeHour: "",
            exprTimeMinute:"",
            image: defaultImage,
            maxOrder: 0,
            description: ""
        }
    )
    const [isErr, setIsErr] = useState(false)
    const errormsg ={
        store: 'กรุณาระบุสถานที่จะรับฝาก',
        pickup: 'กรุณาระบุสถานที่รับของ',
        time: 'กรุณาระบุเวลาปิดรับออเดอร์',
        max: 'กรุณาระบุจำนวนออเดอร์ที่รับฝาก'
    }
    function convertImageToBase64(file, callback) {
        var reader = new FileReader();
        reader.onload = function () {
            var dataURL = reader.result;
            var canvas = document.createElement('canvas');
            var img = new Image();
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                var ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                var dataURL = canvas.toDataURL('image/jpeg');
                callback(dataURL);
            };
            img.src = dataURL;
        };
        reader.readAsDataURL(file);
    }
    const handleSubmit = async () => {
        if (detailState.loactionStoreName === '' || detailState.locationPickupName === ''
            || detailState.exprTimeHour === '' || detailState.exprTimeMinute === '' || detailState.maxOrder === 0
        ) {
            setIsErr(true)
            return
        }



        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        console.log(detailState)
        const formdata = JSON.stringify(detailState)
        const response = await axios.post('/Card/createCard', formdata, config)
        console.log(response)
       window.location.reload()

    }
    return (
        <Modal onClose={props.onClose}>
            <div className="container-addcard" id="modal-container">
                <button onClick={props.onClose} className="btn btn-danger close-btn" id="close-btn">X</button>
                <h1>เพิ่มรายการฝาก</h1>
                <div className="form-group">
                    <label className="d-flex" htmlFor="inputAddress">สถานที่<p className='text-danger'>*</p></label>
                    <input type="text" className="input form-input" id="inputAddress" placeholder="ระบุสถานที่,โรงอาหาร " onChange={(e) => { setDetailState({ ...detailState, loactionStoreName: e.target.value }) }} />
                    {detailState.loactionStoreName === '' && isErr && <p className='text-danger'>{errormsg.store}</p>}
                </div>
                <div className="form-group">
                    <label className="d-flex" htmlFor="inputAddress">สถานที่รับของ<p className='text-danger'>*</p> </label>
                    <input type="text" className="input form-input" id="inputAddress" placeholder="ระบุสถานที่ที่ต้องการให้ผู้ฝากมารับของ" onChange={(e) => { setDetailState({ ...detailState, locationPickupName: e.target.value }) }} />
                    {detailState.locationPickupName === '' && isErr && <p className='text-danger'>{errormsg.pickup}</p>}
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label className="d-flex" htmlFor="inputCity">เวลาปิดรับออเดอร์<p className='text-danger'>*</p></label>
                        <input type="time" className="input form-input" id="inputCity" onChange={(e) => {
                            setDetailState({
                                ...detailState, exprTimeHour: e.target.value.slice(0, 2), exprTimeMinute: e.target.value.slice(-2)
                            })
                        }} />
                        {detailState.exprTimeHour === '' && isErr && <p className='text-danger'>{errormsg.time}</p>}
                    </div>
                    <label className="d-flex" htmlFor="inputZip">จำนวนออเดอร์ที่รับฝาก<p className='text-danger'>*</p></label>
                    <div className="form-group col-md-2">
                        <input type="number" min={ 1} className="input form-input" id="inputZip" onChange={(e) => {
                            setDetailState({
                                ...detailState, maxOrder: e.target.value
                            })
                        }} />
                        {detailState.maxOrder === 0 && isErr && <p style={{ width:'250px' }} className='text-danger'>{errormsg.max}</p>}
                    </div>
                   
                </div>
                <div className="form-group">
                    <div><label htmlFor="exampleFormControlFile1">รูปภาพประกอบ</label></div>
                    <input type="file" className="input form-input" id="exampleFormControlFile1"
                        onChange={(e) => {
                            convertImageToBase64(e.target.files[0], (base) => setDetailState({ ...detailState, image: base }))
                        }} />
                </div>
                <div className="form-group">
                    <div><label htmlFor="exampleFormControlFile1">Note เพิ่มเติม</label></div>
                    <textarea onChange={(e) => { setDetailState({ ...detailState, description: e.target.value }) }} className="input form-input" id="note" />
                </div>
                <div className="d-flex justify-content-center">
                    <button onClick={handleSubmit} className="def-btn btn mt-3 col-md-5">เพิ่มรายการ</button>
                </div>
            </div>
        </Modal>
    )

}

export default AddCard