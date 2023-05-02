import axios from 'axios'
import { useEffect,useState } from 'react'
import UserProfile from './UserProfile'
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
             
                const response = await axios.get(`/Account/select?id=${props.order.ownerID}`)
             
                setOwnerName(response.data[0])


            } catch (error) {
            
            }
        }

        fetchOwner()
    }
        , [])

    return (
        <div className="card my-5">
            {displayProfile && <UserProfile user={ownerName} tel={ownerName.phoneNumber} onClose={() => { setdisplayProfile(false) }} />}
            <div className="card-header">
                {props.order.storeName}
            </div>
            <div className="card-body">
                <h5 className="card-title">{props.order.description}</h5>
                <p className="card-text">ผู้รับฝาก : <strong onClick={() => { setdisplayProfile(true) }}> {ownerName.name}</strong></p>
                {props.order.isComplete ? <h4 className="text-success">ได้รับสินค้าแล้ว</h4> :
                    <button onClick={() => { submitOrder(props.order.orderID) }}
                        className="btn btn-success">ยืนยัน</button>}

            </div>
        </div>
        )
}
export default MyOrderCard 