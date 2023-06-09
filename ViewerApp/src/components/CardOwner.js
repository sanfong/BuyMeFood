﻿import { useEffect, useState } from "react";
import axios from 'axios'
import UserProfile from "./UserProfile";
import './CardOwner.css'

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
            
                setDetail(response.data)
            } catch (error) {
                
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


        const response = await axios.get(`/Account/select?id=${id}`, config)
        console.log(response.data[0])
        const data=response.data[0]
        setUserProps({
            image:data.image,
            fullName: data.fullName,
            name: data.username,
            tel: data.phoneNumber,
        })
        setdisplayProfile(true)

    }
    return (
        <div>
            {displayProfile && <UserProfile user={userProps} tel={userProps.tel} onClose={() => { setdisplayProfile(false) }} />}
            <div className="background cardOwn">
                <div class="card mb-3 cardOwn">
                    <div className="card-image-wrapper cardOwn">
                        <img class="card-img-top cardOwn" src={props.order.image} alt="Card image cap" />
                    </div>
                    <div class="card-body cardOwn">
                        <h5 class="card-title cardOwn">{props.order.loactionStoreName}</h5>
                        <p class="card-text cardOwn">{props.order.description}</p>
                        <p class="card-text cardOwn"><small class="text-muted">เวลาปิดรับ: {timeString}</small></p>
                        {displayDetail &&
                            <div>
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                          
                                            <th scope="col">ผู้ฝาก</th>
                                            <th scope="col">ร้าน</th>
                                            <th scope="col" style={{ width: '300px' }}>รายละเอียด</th>
                                            <th scope="col">สถานะ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {detail.map((order) => {
                                            return (
                                                <tr key={order.orderID} onClick={() => { ownerProfile(order.ownerID) }}>
                                                   
                                                    <td style={{ width: '10%', wordBreak: 'break-word' }}>{order.ownerName}</td>
                                                    <td style={{ width: '15%', wordBreak: 'break-word' }}>{order.storeName}</td>
                                                    <td style={{ width: '60%', wordBreak: 'break-word' }}>{order.description}</td>
                                                    <td style={{ width: '15%', wordBreak: 'break-word' }}>{order.isComplete ? <span className="text-success">ส่งแล้ว</span> : <span className="text-danger">ยังไม่ส่ง</span>}</td>
                                                </tr>)
                                        })}
                                    </tbody>
                                </table>

                            </div>}
                        <div className="card-btn-container">
                            {!props.order.isExpired && <button onClick={() => {
                                closeOrder(
                                    props.order.cardID
                                )
                                window.location.reload()
                            }} className="btn btn-success cardOwn move-right">ปิดรับ</button>}

                            {!displayDetail ? (
                                <button
                                    className="btn btn-warning mx-3"
                                    onClick={() => {
                                        setDisplayDetail(true);
                                    }}
                                >
                                    ดูรายการฝาก
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        setDisplayDetail(false);
                                    }}
                                    className="btn btn-danger move-left"
                                >
                                    ย่อรายการฝาก
                                </button>
                            )}

                            
                        </div>
                    </div>
                </div>
            </div>
            
         </div>

    )

}
export default CardOwner