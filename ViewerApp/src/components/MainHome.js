import React, { Component, useState } from 'react';
import Card from './Card'
import AddCard from './AddCard';
const MainHome = (props) => {
    const [displayAdd, setDisplayAdd] = useState(false)
    return (
        <div>
          
            <div style={{ padding: '3rem', borderBottom: '2px solid green', backgroundImage: 'url("https://img.freepik.com/free-vector/hand-drawn-delicious-food-background_52683-16136.jpg?size=626&ext=jpg&ga=GA1.2.284292450.1670951791&semt=sph")', margin: '0' }} className="row">
                <div class="col-md-6 mx-auto">
                    <div className="input-group mb-6" >
                        <input type="text" className="form-control" placeholder="Search Your Location" aria-label="Recipient's username" aria-describedby="button-addon2" />
                        <div className="input-group-append">
                            <button className="btn btn-danger" type="button" id="button-addon2" style={{ borderBottomLeftRadius: '0', borderTopLeftRadius: '0' }}>Search</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mt-4" >

                <h1>There's something for everyone!</h1>
                <div className="row justify-content-center" style={{ margin: '0', width: '100%' }}>
                    {props.data.map(order => {
                        return (
                            <Card item={order} />
                        )
                    })}
                </div>
            </div>
            <button onClick={() => { setDisplayAdd(true) }} className='btn btn-success' style={{ position: 'fixed', bottom: '5rem', right: '3rem' }} >+ เพิ่มรายการฝาก</button>
        </div>


    
    )

}
export default MainHome