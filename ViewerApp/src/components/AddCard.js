import Modal from "./Modal"

const AddCard = (props) => {

    return (
        <Modal onClose={props.onClose}>
            <div className="container" style={{ padding: '3rem' }}>
                <button onClick={props.onClose} className="btn btn-danger" style={{ height: '40px', position: 'absolute', right: '2rem' }}>x</button>
            <h1>เพิ่มรายการฝาก</h1>
        

                <div class="form-group">
                    <label for="inputAddress">สถานที่</label>
                    <input type="text" class="form-control" id="inputAddress" placeholder="ระบุร้าน, "/>
                </div>
                    <div class="form-group">
                        <label for="inputAddress">สถานที่รับของ</label>
                        <input type="text" class="form-control" id="inputAddress" placeholder="ระบุสถานที่ที่ต้องการให้ผู้ฝากมารับของ" />
                    </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="inputCity">เวลาปิดรับออเดอร์</label>
                        <input type="time" class="form-control" id="inputCity"/>
                        </div>
                     <label for="inputZip">จำนวนออเดอร์ที่รับฝาก</label>
                    <div class="form-group col-md-2">
                        <input type="number" class="form-control" id="inputZip"/>
                    </div>
                </div>

                    <div class="form-group">
                        <div><label for="exampleFormControlFile1">รูปภาพประกอบ</label></div>
                        <input type="file" class="form-control-file" id="exampleFormControlFile1"/>
                </div>
                <div class="form-group">
                    <div><label for="exampleFormControlFile1">Note เพิ่มเติม</label></div>
                    <textarea class="form-control-file" style={{ width: '100%', height:'150px' }} />
                </div>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-success mt-3 col-md-5">เพิ่มรายการ</button>
                </div>
                
                
     

            </div>

        </Modal>
    )
}

export default AddCard