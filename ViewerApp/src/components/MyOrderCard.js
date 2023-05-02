import axios from 'axios'
import { useEffect,useState } from 'react'
import UserProfile from './UserProfile'
const MyOrderCard = (props) => {
    const [ownerName, setOwnerName] = useState('')
    const [displayProfile, setdisplayProfile] = useState(false)
    const submitOrder = async (id) => {
        try {
            const response = await axios.post(`/Card/submitOrder?orderID=${id}`)
            console.log(response.data)
            window.location.reload()

        } catch (error) {
            console.error(error)
        }

    }

    useEffect(() => {
        const fetchOwner = async () => {
            try {
                console.log(props.order.ownerID)
                const response = await axios.get(`/Account/select?id=${props.order.ownerID}`)
                console.log(response.data[0])
                setOwnerName(response.data[0])


            } catch (error) {
                console.error(error)
            }
        }

        fetchOwner()
    }
        , [])

    return (
        <div class="card my-5">
            {displayProfile && <UserProfile user={ownerName} tel={ownerName.phoneNumber} onClose={() => { setdisplayProfile(false) }} />}
            <div class="card-header">
                {props.order.storeName}
            </div>
            <div class="card-body">
                <h5 class="card-title">{props.order.description}</h5>
                <p class="card-text">ผู้รับฝาก : <strong onClick={() => { setdisplayProfile(true) }}> {ownerName.name}</strong></p>
                {props.order.isComplete ? <h4 className="text-success">ได้รับสินค้าแล้ว</h4> :
                    <button onClick={() => { submitOrder(props.order.orderID) }}
                        class="btn btn-success">ยืนยัน</button>}

            </div>
        </div>
        )
}
export default MyOrderCard 