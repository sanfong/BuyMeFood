import { useState } from "react"
import Modal from "./Modal"
import axios from 'axios'
import './AddCard.css';

const AddCard = (props) => {
    const [detailState, setDetailState] = useState(
        {
            loactionStoreName: "",
            locationPickupName: "",
            exprTimeHour: 0,
            exprTimeMinute: 0,
            image: "",
            maxOrder: 0,
            description: ""
        }
    )
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
        console.log(detailState)
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const formdata = JSON.stringify(detailState)
        const response = await axios.post('/Card/createCard', formdata, config)
        console.log(response)
        window.location.reload()

    }
    return (
        <Modal onClose={props.onClose}>
            <div className="container" id="modal-container">
                <button onClick={props.onClose} className="btn btn-danger" id="close-btn">x</button>
                <h1>เพิ่มรายการฝาก</h1>
                <div className="form-group">
                    <label htmlFor="inputAddress">สถานที่</label>
                    <input type="text" className="form-control" id="inputAddress" placeholder="ระบุร้าน, " onChange={(e) => { setDetailState({ ...detailState, loactionStoreName: e.target.value }) }} />
                </div>
                <div className="form-group">
                    <label htmlFor="inputAddress">สถานที่รับของ</label>
                    <input type="text" className="form-control" id="inputAddress" placeholder="ระบุสถานที่ที่ต้องการให้ผู้ฝากมารับของ" onChange={(e) => { setDetailState({ ...detailState, locationPickupName: e.target.value }) }} />
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputCity">เวลาปิดรับออเดอร์</label>
                        <input type="time" className="form-control" id="inputCity" onChange={(e) => {
                            setDetailState({
                                ...detailState, exprTimeHour: e.target.value.slice(0, 2), exprTimeMinute: e.target.value.slice(-2)
                            })
                        }} />
                    </div>
                    <label htmlFor="inputZip">จำนวนออเดอร์ที่รับฝาก</label>
                    <div className="form-group col-md-2">
                        <input type="number" className="form-control" id="inputZip" onChange={(e) => {
                            setDetailState({
                                ...detailState, maxOrder: e.target.value
                            })
                        }} />
                    </div>
                </div>
                <div className="form-group">
                    <div><label htmlFor="exampleFormControlFile1">รูปภาพประกอบ</label></div>
                    <input type="file" className="form-control-file" id="exampleFormControlFile1"
                        onChange={(e) => {
                            convertImageToBase64(e.target.files[0], (base) => setDetailState({ ...detailState, image: base }))
                        }} />
                </div>
                <div className="form-group">
                    <div><label htmlFor="exampleFormControlFile1">Note เพิ่มเติม</label></div>
                    <textarea onChange={(e) => { setDetailState({ ...detailState, description: e.target.value }) }} className="form-control-file" id="note" />
                </div>
                <div className="d-flex justify-content-center">
                    <button onClick={handleSubmit} className="btn btn-success mt-3 col-md-5">เพิ่มรายการ</button>
                </div>
            </div>
        </Modal>
    )

}

export default AddCard