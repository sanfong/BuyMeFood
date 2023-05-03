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
    const existNote = props.item.note !== ''
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

            <div className='container'>
                <div className="order" style={{ display: 'flex', justifyContent: 'space-between' }}  >
                    <h1 className="card-title"> <strong>{props.item.place}</strong></h1>
                    <h1 style={{ color: props.isFull && 'red' }}>จำนวนที่รับ: {props.item.orderCount}/{props.item.maxOrder}</h1>
                    

                </div>
                <div className="order"  >
                    <h3 >ผู้รับฝาก : {ownerName}</h3>
                  
                    <div className={isExpired ? "bg bg-danger text-white " : "bg bg-success text-white "}>
                        <p style={{ fontSize: '16px', marginBottom: '0'}}>{isExpired ? 'close' : 'open'}</p>
                    </div>
                </div>
                <p >โทร: {tel}</p>
                <div className="order">

                    <h4 >เวลาปิดรับออเดอร์ : {timeString}</h4>
                    {isOwner && !isExpired && < button className="btn btn-success col-2 col-md-2 col-lg-2" onClick={() => {
                        closeOrder(props.cardId)
                        setIsExpired(true)
                    }}>ปิดรับ</button>}
                </div>
                
                <h4 >สถานที่รับอาหาร : {props.item.loactionPickupName}</h4>
                <h4>Note : {!existNote && '-' }</h4>
                {existNote && <div className="ex-note" >
                    <p>{props.item.description}</p>
                </div>}


                {displayForm && <div><hr />
                    <div className="d-flex justify-content-between">
                        <h2>กรอกรายการที่ต้องการฝากซื้อ</h2>
                        <button onClick={() => {
                            setDisplayForm(false)
                            setIsErr(false)
                        }} className="btn btn-danger" style={{ height: '40px' }}>x</button>
                    </div>
                    
                    <form >
                        <div className="form-group">
                            <label >ร้าน</label>
                            <input onChange={(e) => { setDetailState({ ...detailState, storeName: e.target.value }) }} ref={nameRef} type="text" className="input form-input" placeholder="ระบุร้านที่ต้องการสั่ง" />
                            {detailState.storeName === '' && isErr && <p style={{ width: '250px' }} className='text-danger'>{errormsg.store}</p>}
                        </div>
                        <div className="form-group">
                            <label >รายละเอียด</label>
                            <textarea onChange={(e) => { setDetailState({ ...detailState, description: e.target.value }) }} ref={descRef} type="text" className="input form-input" placeholder="กรอกเมนู จำนวน และรายละเอียดต่างๆที่ต้องการ" />
                            {detailState.description === '' && isErr && <p style={{ width: '250px' }} className='text-danger'>{errormsg.descp}</p>}
                        </div>
                    </form>
                </div>}
                {displayOrder &&
                <div>
                        <table className="table table-hover">
                            <thead>
                                
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">ผู้ฝาก</th>
                                    <th scope="col">ร้าน</th>
                                    <th scope="col" style={{ width:'300px' }}>รายละเอียด</th>
                                    <th scope="col">สถานะ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetail.map((order) => {
                                    return (

                                        <tr key={ order.orderID} onClick={() => { ownerProfile(order.ownerID) }}>
                                            <th scope="row">{order.orderID}</th>
                                            <td>{order.ownerName}</td>
                                            <td>{order.storeName}</td>
                                            <td>{order.description}</td>
                                            <td>{order.isComplete ? <span className="text-success">ส่งแล้ว</span> : <span className="text-danger">ยังไม่ส่ง</span> }</td>
                                    </tr>)
                                })}
                            </tbody>
                        </table>

                </div>}
                    
                <div className='d-flex justify-content-around container my-3 '>
                    {!isOwner ? <button onClick={SubmitForm} disabled={isExpired} className="btn btn-success col-6 col-md-3 col-lg-2">{displayForm ? 'ยืนยัน' : 'ฝากสั่ง'}</button> : !displayOrder ? < button onClick={() => {
                    
                        setDisplayOrder(true)
                    }} className="btn btn-warning">ดูรายการฝาก</button> : <button onClick={() => { window.location.replace('mycard') }} className='btn btn-warning'>ดูรายการรับฝากทั้งหมด</button>} 
                    <button className="btn btn-danger  col-5 col-md-3 col-lg-2" onClick={props.onClose}>ปิด</button>
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