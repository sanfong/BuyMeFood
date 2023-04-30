import { useEffect,useState } from "react"
import axios from 'axios'
const MyOrder = () => {
    const [myOrder, setMyOrder] = useState([])
    const [filter,setFilter]=useState(false)
    useEffect(() => {
        const fetchMyOrder = async () => {
            try {
                const response = await axios.get(`/Card/GetOwnerOrder`)
                console.log(response.data)
                setMyOrder(response.data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchMyOrder()
    }, [])
    const submitOrder = async(id) => {
        try {
            const response = await axios.post(`/Card/submitOrder?orderID=${id}`)
            console.log(response.data)

        } catch (error) {
            console.error(error)
        }
    }

    const orderElement = myOrder.map(order => {
        return (
            <div class="card my-5">
                <div class="card-header">
                    Featured
                </div>
                <div class="card-body">
                    <h5 class="card-title">{order.storeName }</h5>
                    <p class="card-text">{order.description}</p>
                    {order.isComplete ? <h4 className="text-success">ได้รับสินค้าแล้ว</h4> : <button onClick={() => { submitOrder(order.orderID) }} class="btn btn-success">ยืนยัน</button> }
                   
                </div>
            </div>
            )
    })

    const filterOrderElement = myOrder.map(order => {
        if (!order.isComplete) {
            return (
                <div class="card my-5">
                    <div class="card-header">
                        Featured
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">{order.storeName}</h5>
                        <p class="card-text">{order.description}</p>
                        {order.isComplete ? <h4 className="text-success">ได้รับสินค้าแล้ว</h4> : <button onClick={() => { submitOrder(order.orderID) }} class="btn btn-success">ยืนยัน</button>}

                    </div>
                </div>
            )
        }

    })
    return (
        <div>
            
            <div class="d-flex justify-content-center form-check form-switch mt-4" >
                <h6 style={{ marginTop: '10px', marginRight:'50px' }}>
                    filter incomplete order
                </h6>
                <input style={{ marginRight: '20px' }}
                    onChange={
                        (e) => { setFilter(e.target.checked) }
                    } class="form-check-input" type="checkbox" style={{ width: '50px', height: '30px' }} />
                   
            </div>
            {!filter ? orderElement : filterOrderElement}


        </div>

        )
}

export default MyOrder