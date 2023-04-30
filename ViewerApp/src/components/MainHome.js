import React, { Component, useState } from 'react';
import Card from './Card';
import AddCard from './AddCard';
import './MainHome.css';

const MainHome = (props) => {
    const [displayAdd, setDisplayAdd] = useState(false);

    return (
        <div>
            <div className="custom-row row">
                <div className="col-md-6 mx-auto">
                    <div className="input-group mb-6" >
                        <input type="text" className="form-control" placeholder="Search Your Location" aria-label="Recipient's username" aria-describedby="button-addon2" />
                        <div className="input-group-append">
                            <button className="btn btn-danger" type="button" id="button-addon2">Search</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-4">
                <h1>There's something for everyone!</h1>
                <div className="row justify-content-center row-custom">
                    {props.data.map(order => {
                        return (
                            <Card item={order} />
                        )
                    })}
                </div>
            </div>

            <button onClick={() => { setDisplayAdd(true) }} className='btn btn-success button-add'>+ เพิ่มรายการฝาก</button>
        </div>
    )
}

export default MainHome;
