import { useState } from "react"
import Modal from "./Modal"
import axios from 'axios'
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
    const handleSubmit = async() => {
        console.log(detailState)
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const formdata = JSON.stringify(detailState)
        const response = await axios.post('/Card/createCard', formdata, config).then(window.location.reload())
        console.log(response)

    }
    return (
        <Modal onClose={props.onClose}>
            <div className="container" style={{ padding: '3rem' }}>
                <button onClick={props.onClose} className="btn btn-danger" style={{ height: '40px', position: 'absolute', right: '2rem' }}>x</button>
            <h1>เพิ่มรายการฝาก</h1>
        

                <div class="form-group">
                    <label for="inputAddress">สถานที่</label>
                    <input type="text" class="form-control" id="inputAddress" placeholder="ระบุร้าน, " onChange={(e) => { setDetailState({ ...detailState, loactionStoreName: e.target.value}) }} />
                </div>
                    <div class="form-group">
                    <label for="inputAddress">สถานที่รับของ</label>
                    <input type="text" class="form-control" id="inputAddress" placeholder="ระบุสถานที่ที่ต้องการให้ผู้ฝากมารับของ" onChange={(e) => { setDetailState({ ...detailState, locationPickupName: e.target.value }) }} />
                    </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="inputCity">เวลาปิดรับออเดอร์</label>
                        <input type="time" class="form-control" id="inputCity" onChange={(e) => {
                            setDetailState({
                                ...detailState, exprTimeHour: e.target.value.slice(0, 2), exprTimeMinute: e.target.value.slice(-2)
                            })
                          
                        }} />
                        </div>
                     <label for="inputZip">จำนวนออเดอร์ที่รับฝาก</label>
                    <div class="form-group col-md-2">
                        <input type="number" class="form-control" id="inputZip" onChange={(e) => {
                            setDetailState({
                                ...detailState, maxOrder: e.target.value
                            })

                        }} />
                    </div>
                </div>

                    <div class="form-group">
                        <div><label for="exampleFormControlFile1">รูปภาพประกอบ</label></div>
                    <input type="file" class="form-control-file" id="exampleFormControlFile1"
                        onChange={(e) => {
                        convertImageToBase64(e.target.files[0], (base) => setDetailState({ ...detailState,image:base }))

                    }} />
                </div>
                <div class="form-group">
                    <div><label for="exampleFormControlFile1">Note เพิ่มเติม</label></div>
                    <textarea onChange={(e) => { setDetailState({ ...detailState, description:e.target.value }) }} class="form-control-file" style={{ width: '100%', height: '150px' }} />
                </div>
                <div className="d-flex justify-content-center">
                    <button onClick={handleSubmit} className="btn btn-success mt-3 col-md-5">เพิ่มรายการ</button>
                </div>
                
                
     

            </div>

        </Modal>
    )
}

export default AddCard