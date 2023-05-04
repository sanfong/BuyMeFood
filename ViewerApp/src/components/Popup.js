import { useEffect, useRef, useState } from "react"
import Modal from "./Modal"
import axios from 'axios'
import './Popup.css'
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link,useHistory } from 'react-router-dom';
const PopUp = (props) => {
    const [displayForm, setDisplayForm] = useState(false)
    const [isOwner, setIsOwner] = useState(false)
    const [displayOrder, setDisplayOrder] = useState(false)
    const [orderDetail, setOrderDetail] = useState({})
    const [ownerName, setOwnerName] = useState('')
    const [isExpired, setIsExpired] = useState(props.item.isExpired)
    const [tel, setTel] = useState('')
    const [isErr, setIsErr] = useState(false)
    const errormsg = {
        store: 'กรุณาระบุร้านที่ต้องการสั่ง',
        descp: 'กรุณาระบุรายละเอียด',
    }
    const [detailState, setDetailState] = useState(
        {
     
            storeName: '',
            description: '',
            cardID: props.cardID
        })
    const existNote = props.item.description !== ''
    const [displayStatus, setDisplayStatus] = useState(false)
    const nameRef = useRef()
    const descRef = useRef()
    const closeOrder = async(id) => {
        const response = await axios.post( `/Card/closeCard?cardID=${id}`        )

    }
    const ownerProfile = async(id) => {
     
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

  
        const response = await axios.get(`/Account/select?id=${id}`, config)
        

    }

    const onSubmitOrder = async () => {
        if (nameRef.current.value.trim() !== '' && descRef.current.value.trim() !== '') {
            setDisplayStatus(true)
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const formdata = JSON.stringify(detailState)
            const response = await axios.post('/Card/createOrder', formdata, config)

            window.location.reload()


        } else {
            setIsErr(true)

        }

    }





    const SubmitForm = async() => {
        if (displayForm) {
            if (nameRef.current.value.trim() !== '' && descRef.current.value.trim() !== '') {
                setDisplayStatus(true)
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };

                const formdata = JSON.stringify(detailState)
                const response = await axios.post('/Card/createOrder', formdata, config)
          
                window.location.reload()


            } else {
                setIsErr(true)

            }
            
        }
        else {
          
            if (props.isLogin) {
                setDisplayForm(true)
            }
            else {
                window.location.replace('/login')
            }
        }
    }
    useEffect(() => {
        if (displayStatus === true) {
            setTimeout(() => {
                setDisplayStatus(false)

            }, 3000)

        }}

        , [displayStatus])
    useEffect(() => {
        const fetchOrderList = async () => {
            try {
                const response = await axios.get(`/Card/GetCardOrder?cardID=${props.cardId}`)
                console.log(response)
                setOrderDetail(response.data)
            } catch (error) {
             
            }
        }
        const fetchOwner = async () => {
            try {
                const response = await axios.get(`/Account/select?id=${props.cardOwnerId}`)
                
                setOwnerName(response.data[0].name)
                setTel(response.data[0].phoneNumber)

            } catch (error) {
              
            }
        }



 
        fetchOrderList()
        fetchOwner()
        if (props.ownerId === props.cardOwnerId) {
            setIsOwner(true)
            
        }

    }, [])

 
    const date = new Date(props.item.expiredTime)
    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <Modal onClose={props.onClose} >
            <div className="pop-container">
            <div style={{}} >
                <img class="pop-img" src={props.item.image} />
            </div>

            <div className='sub-container'>
                <div className="order-head"  >
                        <h3 className="card-title"> สถานที่: <strong>{props.item.loactionStoreName}</strong></h3>
                        <h3 style={{ color: props.isFull && 'red' }}>จำนวนที่รับ: <strong>{props.item.orderCount}/{props.item.maxOrder}</strong></h3>
                    

                    </div>

                    <div className='suborder row'>
                        <div className="col-6">
                            <div className="order"  >
                                <div className='d-flex'> 
                                    <h5 className='label'>ผู้รับฝาก</h5>
                                    <h5 style={{ marginTop: '10px', fontSize: 'clamp(12px, 2.5vw, 24px)' }}> {ownerName}</h5>
                                </div>



                            </div>
                            <div className='d-flex'>
                                <h5 className='label'>โทร</h5>
                                <h5 style={{ marginTop: '10px', fontSize: 'clamp(12px, 2.5vw, 24px)' }}> {tel}</h5>
                            </div>
                        </div>
                        <div className="col-6">

                            <div className="order">

                         
                                <div className='d-flex'>
                                    <h5 className='label'>เวลาปิดรับ</h5>
                                    <h5 style={{ marginTop: '10px', fontSize: 'clamp(12px, 2.5vw, 24px)' }}>  {timeString}</h5>
                                </div>

                            </div>

                 
                            <div className='d-flex'>
                                <h5 className='label'>สถานที่รับ </h5>
                                <h5 style={{ marginTop: '10px', fontSize: 'clamp(12px, 2.5vw, 24px)' }}>  {props.item.loactionPickupName}</h5>
                            </div>

                        </div>
                        
                        <div className='d-flex'>
                            <h5 className='label'>Note</h5>
                            <h5 style={{ marginTop: '10px' }}>  {!existNote && '-'}</h5>

                        </div>


                        {existNote && <div className="ex-note" >
                            <p>{props.item.description}</p>
                        </div>}
                    </div>




                {displayForm && <div>
                    <div className="d-flex justify-content-between mx-3">

                            <h2 className='form-order'>กรอกรายการที่ต้องการฝากซื้อ</h2>
                        <button onClick={() => {
                            setDisplayForm(false)
                                setIsErr(false)
                            }} className="btn btn-secondary" style={{ height: '40px', marginLeft:'20px' }}>x</button>
                    </div>

                        <form className='form-body'>
                            <div className="form-group">
                                <label style={{ color: '#cb7f4c', fontSize: 'clamp(18px, 2.5vw, 24px)' }}>ร้าน</label>
                            <input onChange={(e) => { setDetailState({ ...detailState, storeName: e.target.value }) }} ref={nameRef} type="text" className="input form-input pt-2" placeholder="ระบุร้านที่ต้องการสั่ง" />
                            {detailState.storeName === '' && isErr && <p style={{ width: '250px' }} className='text-danger'>{errormsg.store}</p>}
                        </div>
                        <div className="form-group">
                                <label style={{ color: '#cb7f4c', fontSize: 'clamp(16px, 2.5vw, 24px)' }}>รายละเอียด</label>
                                <textarea onChange={(e) => { setDetailState({ ...detailState, description: e.target.value }) }} ref={descRef} type="text" className="input form-input pt-2" placeholder="กรอกเมนู จำนวน และรายละเอียดต่างๆที่ต้องการ" />
                            {detailState.description === '' && isErr && <p style={{ width: '250px' }} className='text-danger'>{errormsg.descp}</p>}
                        </div>
                    </form>
                </div>}
                {displayOrder &&
                <div>
                        <table className="table table-hover">
                            <thead>
                                
                                <tr>
                             
                                    <th scope="col">ผู้ฝาก</th>
                                    <th scope="col">ร้าน</th>
                                    <th scope="col" style={{ width:'100px' }} >รายละเอียด</th>
                                    <th scope="col">สถานะ</th>
                                </tr>
                            </thead>
                            <tbody>
                               {orderDetail.map((order) => {
                                   return (

                                       <tr  key={order.orderID} onClick={() => { ownerProfile(order.ownerID) }}>
                                   
                                           <td style={{ width: '10%', wordBreak: 'break-word' }}>{order.ownerName}</td>
                                            <td style={{ width: '15%', wordBreak: 'break-word' }}>{order.storeName}</td>
                                           <td style={{ width: '60%', wordBreak: 'break-word' }} >{order.description}</td>
                                           <td style={{ width: '15%', wordBreak: 'break-word' }}>{order.isComplete ? <span className="text-success">ส่งแล้ว</span> : <span className="text-danger">ยังไม่ส่ง</span> }</td>
                                    </tr>)
                               })}
                           </tbody>
                        </table>

                </div>}

                    <div className='d-flex justify-content-between btn-order'>
                        {isOwner ? displayOrder ? < button className='def-btn' onClick={() => { window.location.replace('mycard') }}>ดูรายการรับฝากทั้งหมด</button> :
                            < button className='def-btn'  onClick={() => { setDisplayOrder(true) }}>ดูรายการฝาก</button> :
                            displayForm ? <button className='def-btn' onClick={onSubmitOrder}>ยืนยัน</button> :
                                <button className='def-btn' onClick={() => { setDisplayForm(true) }} >ฝากสั่ง</button>}
                        <button className='clc-btn' onClick={props.onClose}>ปิด</button>
                    </div>







                </div>
            </div>




            {displayStatus && <div className="alert alert-success alert-dismissible fade show fixed-top" role="alert" style={{ position: 'absolute', top: '0' }}>
                <strong>ฝากซื้อสำเร็จ !</strong>

            </div>}


         </Modal>
        )
}
export default PopUp