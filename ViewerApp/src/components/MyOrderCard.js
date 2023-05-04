import axios from 'axios'
import { useEffect,useState } from 'react'
import UserProfile from './UserProfile'
import './MyOrderCard.css'

const MyOrderCard = (props) => {
    const [ownerName, setOwnerName] = useState('')
    const [displayProfile, setdisplayProfile] = useState(false)
    const submitOrder = async (id) => {
        try {
            const response = await axios.post(`/Card/submitOrder?orderID=${id}`)
         
            window.location.reload()

        } catch (error) {
          
        }

    }

    useEffect(() => {
        const fetchOwner = async () => {
            try {



                const response = await axios.get(`/Card/select?id=${props.order.cardID}`)
                const ownerCardID = response.data[0].ownerID
                const ownerCardName = await axios.get(`/Account/select?id=${ownerCardID}`)
                console.log(ownerCardName.data[0].name)





          
                setOwnerName(ownerCardName.data[0])


            } catch (error) {
            
            }
        }

        fetchOwner()
    }
        , [])

    return (
        <div className="background card-order">
            <div className="card my-5 card-order">
                {displayProfile && <UserProfile user={ownerName} tel={ownerName.phoneNumber} onClose={() => { setdisplayProfile(false) }} />}
                <div className="card-header card-order">
                    {props.order.storeName}
                </div>
                <div className="card-body card-order">
                    <h5 className="card-title card-order">{props.order.description}</h5>
                    <p className="card-text card-order">ผู้รับฝาก : <strong onClick={() => { setdisplayProfile(true) }}> {ownerName.name}</strong></p>
                    {props.order.isComplete ? <h4 className="text-success card-order">ได้รับสินค้าแล้ว</h4> :
                        <button onClick={() => { submitOrder(props.order.orderID) }}
                            className="btn btn-success card-order">ยืนยัน</button>}

                </div>
            </div>
        </div>
        )
}
export default MyOrderCard 