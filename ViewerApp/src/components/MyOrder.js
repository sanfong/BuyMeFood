import { useEffect,useState } from "react"
import axios from 'axios'
import MyOrderCard from "./MyOrderCard"
const MyOrder = () => {
    const [myOrder, setMyOrder] = useState([])
    const [filter, setFilter] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    useEffect(() => {
        const fetchMyOrder = async () => {
            try {
                const response = await axios.get(`/Card/GetOwnerOrder`)
             
                setMyOrder(response.data)
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
            <MyOrderCard key={order.cardID} order={ order} />
            )
    })

    const filterOrderElement = myOrder.map(order => {
        if (!order.isComplete) {

        }

    })
    return (
        <div>
            
            <div className="d-flex justify-content-center form-check form-switch mt-4" >
                <h6 style={{ marginTop: '10px', marginRight:'50px' }}>
                    filter incomplete order
                </h6>
                <input style={{ marginRight: '20px' }}
                    onChange={
                        (e) => { setFilter(e.target.checked) }
                    } className="form-check-input" type="checkbox" style={{ width: '50px', height: '30px' }} />
                   
            </div>
            {!filter ? orderElement : filterOrderElement}


        </div>

        )
}

export default MyOrder