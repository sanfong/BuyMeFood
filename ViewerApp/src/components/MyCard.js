import { useEffect,useState } from "react"
import axios from 'axios'
import CardOwner from "./CardOwner"
const MyCard = () => {
    const [myCard, setMyCard] = useState([])
    const [filter,setFilter]=useState(false)
    useEffect(() => {
        const fetchmyCard = async () => {
            try {
                const response = await axios.get(`/Card/GetOwnerCard`)
                console.log(response.data)
                setMyCard(response.data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchmyCard()
    }, [])
    const submitOrder = async(id) => {
        try {
            const response = await axios.post(`/Card/submitOrder?orderID=${id}`)
            console.log(response.data)

        } catch (error) {
            console.error(error)
        }
    }

    const cardElement = myCard.map(order => {

        return (
            <CardOwner order={order} />
            )
    })

    const filterCardElement = myCard.map(order => {
        if (!order.isExpired) {
            return (
                <CardOwner order={order} />
            )
        }

    })
    return (
        <div>
            
            <div class="d-flex justify-content-center form-check form-switch mt-4" >
                <h6 style={{ marginTop: '10px', marginRight:'50px' }}>
                    filter not expired
                </h6>
                <input style={{ marginRight: '20px' }}
                    onChange={
                        (e) => { setFilter(e.target.checked) }
                    } class="form-check-input" type="checkbox" style={{ width: '50px', height: '30px' }} />
                   
            </div>
            {!filter ? cardElement : filterCardElement}


        </div>

        )
}

export default MyCard