import { useEffect, useRef, useState } from "react"
import Modal from "./Modal"

const PopUp = (props) => {
    const [displayForm, setDisplayForm] = useState(false)
    const existNote = props.item.note !== ''
    const [displayStatus, setDisplayStatus] = useState(false)
    const nameRef = useRef()
    const descRef = useRef()
    const SubmitForm = () => {
        if (displayForm) {
            if (nameRef.current.value.trim() !== '' && descRef.current.value.trim() !== '') {
                setDisplayStatus(true)
            }
            
        }
        else {
            setDisplayForm(true)
        }
    }
    useEffect(() => {
        if (displayStatus === true) {
            setTimeout(() => { setDisplayStatus(false) }, 3000)
        }}

        , [displayStatus])
    return (
        <Modal onClose={props.onClose}>
            <div style={{}} >
                <img style={{ width: '100%', height: '200px', objectFit: 'cover', margin: '0', borderRadius: '40px', borderBottomRightRadius: '0', borderBottomLeftRadius:'0' }} src={props.item.img} />
            </div>

            <div className='container' style={{ marginTop:'1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}  >
                    <h1 className="card-title"> <strong>{props.item.place}</strong></h1>
                    <h1 style={{ color: props.isFull && 'red' }}>จำนวนที่รับ: {props.item.current_amount}/{props.item.order_amount}</h1>

                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}  >
                    <h3 >ผู้รับฝาก : {props.item.buyer}</h3>
                    <div class={props.isFull ? "bg-danger text-white " : "bg-success text-white "} style={{ height:'30px', width: '50px', borderRadius: '7px', textAlign: 'center' }}>
                        <p style={{ fontSize: '16px', marginBottom: '0'}}>{props.isFull ? 'close' : 'open'}</p>
                    </div>
                </div>

                <h4 >เวลาปิดรับออเดอร์ : {props.item.period}</h4>
                <h4 >สถานที่รับอาหาร : {props.item.takeplace}</h4>
                <h4>Note : {!existNote && '-' }</h4>
                {existNote && <div style={{ border: '1px solid gray', height: '100px', padding: '10px', borderRadius: '7px' }} >
                    <p>{props.item.note}</p>
                </div>}


                {displayForm && <div><hr />
                    <div className="d-flex justify-content-between">
                        <h2>กรอกรายการที่ต้องการฝากซื้อ</h2>
                        <button onClick={() => { setDisplayForm(false) }} className="btn btn-danger" style={{ height:'40px' }}>x</button>
                    </div>
                    
                    <form >
                        <div class="form-group">
                            <label for="exampleFormControlInput1">ร้าน</label>
                            <input ref={nameRef} type="text" class="form-control" placeholder="ระบุร้านที่ต้องการสั่ง" />
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlInput1">รายละเอียด</label>
                            <textarea ref={descRef} type="text" class="form-control" placeholder="กรอกเมนู จำนวน และรายละเอียดต่างๆที่ต้องการ" />
                        </div>
                    </form>
                </div>}
                <div className='d-flex justify-content-around container my-3 '>
                    <button onClick={SubmitForm} disabled={props.isFull} className="btn btn-success col-6 col-md-3 col-lg-2">{displayForm? 'ยืนยัน': 'ฝากสั่ง'}</button>
                    <button className="btn btn-danger  col-5 col-md-3 col-lg-2" onClick={props.onClose}>ปิด</button>
                </div>
            </div>
            {displayStatus && <div class="alert alert-success alert-dismissible fade show fixed-top" role="alert" style={{ position: 'absolute', top: '0' }}>
                <strong>ฝากซื้อสำเร็จ !</strong>

            </div>}


         </Modal>
        )
}
export default PopUp