import { useEffect,useState } from "react"
import axios from 'axios'
import MyOrderCard from "./MyOrderCard"
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
    const orderElement = myOrder.map(order => {
        return (
            <MyOrderCard order={ order} />
            )
    })

    const filterOrderElement = myOrder.map(order => {
        if (!order.isComplete) {

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