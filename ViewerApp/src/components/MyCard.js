import { useEffect,useState } from "react"
import axios from 'axios'
import CardOwner from "./CardOwner"
import './CardOwner.css'

const MyCard = () => {
    const [myCard, setMyCard] = useState([])
    const [filter,setFilter]=useState(false)
    useEffect(() => {
        const fetchmyCard = async () => {
            try {
                const response = await axios.get(`/Card/GetOwnerCard`)
             
                setMyCard(response.data)
            } catch (error) {
          
            }
        }
        const fetchDatauser = async () => {
            try {
                const response = await axios.get('/Account')
                fetchmyCard()


            } catch (error) {
                window.location.replace('/login')
            }
        }
        fetchDatauser()
       
    }, [])
    const submitOrder = async(id) => {
        try {
            const response = await axios.post(`/Card/submitOrder?orderID=${id}`)
         

        } catch (error) {
        
        }
    }

    const cardElement = myCard.map(order => {
        return (
            <CardOwner key={order.cardID} order={order} />
            )
    })

    const filterCardElement = myCard.map(order => {
        if (!order.isExpired) {
            return (
                <CardOwner key={ order.cardID} order={order} />
            )
        }

    })
    return (
        <div>
            
            <div className="d-flex justify-content-center form-check form-switch mt-4" >
                <h6 style={{ marginTop: '10px', marginRight:'50px' }}>
                    filter not expired
                </h6>
                <input style={{ marginRight: '20px' }}
                    onChange={
                        (e) => { setFilter(e.target.checked) }
                    } className="form-check-input" type="checkbox" style={{ width: '50px', height: '30px' }} />
                   
            </div>
            {!filter ? cardElement : filterCardElement}


        </div>

        )
}

export default MyCard