import { useEffect,useState } from "react"
import axios from 'axios'
import MyOrderCard from "./MyOrderCard"
const MyOrder = () => {
    const [myOrder, setMyOrder] = useState([])
    const [filter, setFilter] = useState(false)
    const [filterele,setFilterEle]=useState([])
    const [isLogin, setIsLogin] = useState(false)
    useEffect(() => {
        const fetchMyOrder = async () => {
            try {
                const response = await axios.get(`/Card/GetOwnerOrder`)
                setMyOrder(response.data)
                const filter = response.data.filter(order => !order.isComplete)
                setFilterEle(filter)

            } catch (error) {
                
            }
        }
         const fetchDatauser = async () => {
                try {
                    const response = await axios.get('/Account')
                    fetchMyOrder()

                    
                } catch (error) {
                    window.location.replace('/login')
                }
        }
        fetchDatauser()
       
    }, [])
    const orderElement = myOrder.map(order => {
        return (
            <MyOrderCard key={order.orderID} order={ order} />
            )
    })
    const FilterorderElement = filterele.map(order => {
        return (
            <MyOrderCard key={order.orderID} order={order} />
        )
    })


    return (

                <div>

            <div className="d-flex justify-content-center form-check position-fixed form-switch mt-4" style={{ right:'20px' }} >
                <h6 style={{ marginTop: '10px', marginRight: '50px' }}>
                     filter incomplete order
                </h6>
                <input style={{ marginRight: '20px' }}
                    onChange={
                        (e) => { setFilter(e.target.checked) }
                    } className="form-check-input" type="checkbox" style={{ width: '50px', height: '30px' }} />

            </div>

            <div style={{ paddingTop: '100px' }}>{!filter ? orderElement : FilterorderElement}</div>


        </div>
        )
}

export default MyOrder