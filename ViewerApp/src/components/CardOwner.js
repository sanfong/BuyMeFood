import { useEffect, useState } from "react";
import axios from 'axios'
import UserProfile from "./UserProfile";
const CardOwner = (props) => {
    const date = new Date(props.order.expiredTime)
    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const [displayDetail, setDisplayDetail] = useState(false)
    const [detail, setDetail] = useState([])
    const [displayProfile, setdisplayProfile] = useState(false)
    const [userProps, setUserProps] = useState({})
    const closeOrder = async (id) => {
        const response = await axios.post(`/Card/closeCard?cardID=${id}`)

    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/Card/GetCardOrder?cardID=${props.order.cardID}`)
                console.log(response)
                setDetail(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])
    const ownerProfile = async (id) => {
        console.log(id)
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };


        const response = await axios.get('/Account/select?id=1', config)
        console.log(response.data[0])
        const data=response.data[0]
        setUserProps({
            image:data.image,
            fullName: data.fullName,
            name: data.name,
            tel: data.phoneNumber,
        })
        setdisplayProfile(true)

    }
    return (
        <div>
            {displayProfile && <UserProfile user={userProps} onClose={() => { setdisplayProfile(false) }} />}
            <div class="card mb-3">
                <img class="card-img-top" src={ props.order.image} alt="Card image cap"/>
                    <div class="card-body">
                    <h5 class="card-title">{props.order.loactionStoreName}</h5>
                    <p class="card-text">{props.order.description}</p>
                    <p class="card-text"><small class="text-muted">เวลาปิดรับ: {timeString}</small></p>
                    {displayDetail &&
                        <div>
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">ผู้ฝาก</th>
                                        <th scope="col">ร้าน</th>
                                        <th scope="col" style={{ width: '300px' }}>รายละเอียด</th>
                                        <th scope="col">สถานะ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {detail.map((order) => {
                                        return (
                                            <tr onClick={ownerProfile}>
                                                <th scope="row">{order.orderID}</th>
                                                <td>{order.ownerName}</td>
                                                <td>{order.storeName}</td>
                                                <td>{order.description}</td>
                                                <td>{order.isComplete ? <span className="text-success">ส่งแล้ว</span> : <span className="text-danger">ยังไม่ส่ง</span>}</td>
                                            </tr>)
                                    })}
                                </tbody>
                            </table>

                        </div>}
                    <div >
                        
                        {!displayDetail ? <button className="btn btn-warning mx-3" onClick={() => { setDisplayDetail(true) }}>ดูรายการฝาก</button> :
                            <button className='btn btn-danger' onClick={() => { setDisplayDetail(false) }}>ปิด</button>
                        }
                        {!props.order.isExpired && <button onClick={() => {
                            closeOrder(
                                props.order.cardID
                            )
                            window.location.reload()
                        }} className="btn btn-success">ปิดรับ</button>}
                    </div>
                </div>
               
            </div>
         </div>

    )

}
export default CardOwner