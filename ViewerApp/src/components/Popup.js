import { useEffect, useRef, useState } from "react"
import Modal from "./Modal"
import axios from 'axios'
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link,useHistory } from 'react-router-dom';
const PopUp = (props) => {
    const [displayForm, setDisplayForm] = useState(false)
    const [isOwner, setIsOwner] = useState(false)
    const [displayOrder, setDisplayOrder] = useState(false)
    const [orderDetail, setOrderDetail] = useState({})

    const [isExpired, setIsExpired] = useState(props.item.isExpired)
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
        console.log(id)
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

  
        const response = await axios.get('/Account/select?id=1', config)
        console.log(response)

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
                console.log(response)
                window.location.reload()


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
            setTimeout(() => { setDisplayStatus(false) }, 3000)
        }}

        , [displayStatus])
    useEffect(() => {
        const fetchOrderList = async () => {
            try {
                const response = await axios.get(`/Card/GetCardOrder?cardID=${props.cardId}`)
                console.log(response)
                setOrderDetail(response.data)
            } catch (error) {
                console.error(error)
            }
        }


        console.log(props.ownerId, props.cardOwnerId, props.cardId)
        fetchOrderList()
        if (props.ownerId === props.cardOwnerId) {
            setIsOwner(true)
            
        }

    }, [])

 
    const date = new Date(props.item.expiredTime)
    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <Modal onClose={props.onClose}>
            <div style={{}} >
                <img style={{ width: '100%', height: '200px', objectFit: 'cover', margin: '0', borderRadius: '40px', borderBottomRightRadius: '0', borderBottomLeftRadius:'0' }} src={props.item.image} />
            </div>

            <div className='container' style={{ marginTop:'1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}  >
                    <h1 className="card-title"> <strong>{props.item.place}</strong></h1>
                    <h1 style={{ color: props.isFull && 'red' }}>จำนวนที่รับ: {props.item.orderCount}/{props.item.maxOrder}</h1>
                    

                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}  >
                    <h3 >ผู้รับฝาก : {props.item.buyer}</h3>
                    <div class={isExpired ? "bg-danger text-white " : "bg-success text-white "} style={{ height:'30px', width: '50px', borderRadius: '7px', textAlign: 'center' }}>
                        <p style={{ fontSize: '16px', marginBottom: '0'}}>{isExpired ? 'close' : 'open'}</p>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h4 >เวลาปิดรับออเดอร์ : {timeString}</h4>
                    {isOwner && !isExpired && < button className="btn btn-success col-2 col-md-2 col-lg-2" onClick={() => {
                        closeOrder(props.cardId)
                        setIsExpired(true)
                    }}>ปิดรับ</button>}
                </div>
                
                <h4 >สถานที่รับอาหาร : {props.item.loactionPickupName}</h4>
                <h4>Note : {!existNote && '-' }</h4>
                {existNote && <div style={{ border: '1px solid gray', height: '100px', padding: '10px', borderRadius: '7px' }} >
                    <p>{props.item.description}</p>
                </div>}


                {displayForm && <div><hr />
                    <div className="d-flex justify-content-between">
                        <h2>กรอกรายการที่ต้องการฝากซื้อ</h2>
                        <button onClick={() => { setDisplayForm(false) }} className="btn btn-danger" style={{ height:'40px' }}>x</button>
                    </div>
                    
                    <form >
                        <div class="form-group">
                            <label for="exampleFormControlInput1">ร้าน</label>
                            <input onChange={(e) => { setDetailState({ ...detailState, storeName: e.target.value }) }} ref={nameRef} type="text" class="form-control" placeholder="ระบุร้านที่ต้องการสั่ง" />
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlInput1">รายละเอียด</label>
                            <textarea onChange={(e) => { setDetailState({ ...detailState, description: e.target.value }) }} ref={descRef} type="text" class="form-control" placeholder="กรอกเมนู จำนวน และรายละเอียดต่างๆที่ต้องการ" />
                        </div>
                    </form>
                </div>}
                {displayOrder &&
                <div>
                        <table class="table table-hover">
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
                                     
                                        <tr onClick={() => { ownerProfile(order.ownerID) }}>
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
                    {!isOwner ? <button onClick={SubmitForm} disabled={isExpired} className="btn btn-success col-6 col-md-3 col-lg-2">{displayForm ? 'ยืนยัน' : 'ฝากสั่ง'}</button> : !displayOrder ? < buttton onClick={() => {
                        console.log(orderDetail)
                        setDisplayOrder(true)
                    }} className="btn btn-warning">ดูรายการฝาก</buttton> : <button onClick={() => { window.location.replace('mycard') }} className='btn btn-warning'>ดูรายการรับฝากทั้งหมด</button>} 
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