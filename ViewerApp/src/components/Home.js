import React, { Component, useState, useEffect } from 'react';
import Card from './Card'
import AddCard from './AddCard';
import axios from 'axios'

const Home = (props) => {
    const [displayAdd, setDisplayAdd] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    const [ownerId, setOwnerId] = useState(0)
    const [initData, setInitData] = useState([])
    const [fitered, setFiltered] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        // fetchDatauser
        axios.get('/Account').then((response) => {
                setIsLogin(true)
                setOwnerId(response.data.id)
        }).catch(() => { })

        // fetchData
        axios.get('/Card/GetNotExpired').then((response) => {
            setInitData(response.data)
            setFiltered(response.data)
        })
    }, [])

    const handleSearch = () => {
        if (search !== '') {
            console.log(search)
            const filter = initData.filter(order => order.loactionStoreName === search);
            setFiltered(filter)
            console.log(filter)
        }
        else {
            setFiltered(initData)
        }
    }

    return (
        <div style={{ backgroundColor: '#fff', height: '100vh', marginTop: '0', paddingTop:'60px' }}>
            <div>
                {displayAdd && <AddCard isLogin={false} onClose={() => { setDisplayAdd(false) }} />}
                <div style={{ padding: '3rem', margin: '0' }} className="row">
                    <div className="col-md-6 mx-auto">
                        <div className="input-group mb-6" >
                            <input style={{ width: '100px' }}
                                onChange={(e) => { setSearch(e.target.value) }}
                                type="text" className="form-control"
                                placeholder="Search Your Location"
                            />
                            <div className="input-group-append">
                                <button onClick={handleSearch} className="def-btn" type="button" id="button-addon2" style={{ borderBottomLeftRadius: '0', borderTopLeftRadius: '0' }}>
                                    <svg style={{ width:'20px' }} xmlns="http://www.w3.org/2000/svg" fill='currentcolor' viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mt-4" >
                    <div className='d-flex justify-content-center' style={{ color: '#FE9F60' }}>
                        <h1><strong>There's something for everyone!</strong></h1>
                    </div>
              
                    <div className="row justify-content-center" style={{ margin: '0', width: '100%' }}>
                        {
                            fitered.map(order => {
                                return (
                                    <Card key={order.cardID} ownerId={ownerId} isLogin={isLogin} item={order} />
                                )
                            })}
                        <div className='d-flex justify-content-center mt-5'>
                            {fitered.length === 0 && <div style={{ textAlign:'center' }}><div >Sorry, it's seem your location didn't found at this time </div>
                                {isLogin && < button onClick={() => { setDisplayAdd(true) }} className='def-btn'  >+ เพิ่มรายการฝาก</button>}
                            </div>
                                }


                        </div>

                    </div>
                </div>
                {isLogin && < button onClick={() => { setDisplayAdd(true) }} className='def-btn' style={{ position: 'fixed', bottom: '5rem', right: '3rem' }} >+ เพิ่มรายการฝาก</button>}
            </div>
        </div>

    )

}
export default Home