import React, { Component, useState } from 'react';
import PopUp from './Popup';

const Card = (props) => {
    const [displayPopUp, setDisplayPopUp] = useState(false)
    const isFull = props.item.current_amount === props.item.order_amount
    const onClose = () => {
        setDisplayPopUp(false)
    }
    return (


        <div className="card col-md-3" style={{ width: '18rem', margin: '1vh', cursor: 'pointer', border: 'transparent' }}>
            {displayPopUp && <PopUp onClose={onClose} item={props.item} isFull={isFull} />}
            <div className="card-body " onClick={() => { setDisplayPopUp(true) }}>
                <img src={props.item.img} style={{ width: '14rem', borderRadius:'10px' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}  >
                    <h3 className="card-title"> <strong>{props.item.place}</strong></h3>
                    <h3 style={{ color: isFull && 'red'}}>{props.item.current_amount}/{props.item.order_amount}</h3>
                    </div>

                <div style={{ display: 'flex', marginTop: '5px', marginBottom:'0' }}>

                    <div style={{ display: "flex" }}> <svg width='15px' style={{ margin: '5px 10px auto 0' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" /></svg>
                        <p>{props.item.period}</p></div>
                    <div style={{ margin:'0 10px' }}>|</div>
                    <div style={{ display: "flex" }}> <svg width='20px' style={{ margin: '0 10px 20px 5px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M312 24V34.5c6.4 1.2 12.6 2.7 18.2 4.2c12.8 3.4 20.4 16.6 17 29.4s-16.6 20.4-29.4 17c-10.9-2.9-21.1-4.9-30.2-5c-7.3-.1-14.7 1.7-19.4 4.4c-2.1 1.3-3.1 2.4-3.5 3c-.3 .5-.7 1.2-.7 2.8c0 .3 0 .5 0 .6c.2 .2 .9 1.2 3.3 2.6c5.8 3.5 14.4 6.2 27.4 10.1l.9 .3 0 0c11.1 3.3 25.9 7.8 37.9 15.3c13.7 8.6 26.1 22.9 26.4 44.9c.3 22.5-11.4 38.9-26.7 48.5c-6.7 4.1-13.9 7-21.3 8.8V232c0 13.3-10.7 24-24 24s-24-10.7-24-24V220.6c-9.5-2.3-18.2-5.3-25.6-7.8c-2.1-.7-4.1-1.4-6-2c-12.6-4.2-19.4-17.8-15.2-30.4s17.8-19.4 30.4-15.2c2.6 .9 5 1.7 7.3 2.5c13.6 4.6 23.4 7.9 33.9 8.3c8 .3 15.1-1.6 19.2-4.1c1.9-1.2 2.8-2.2 3.2-2.9c.4-.6 .9-1.8 .8-4.1l0-.2c0-1 0-2.1-4-4.6c-5.7-3.6-14.3-6.4-27.1-10.3l-1.9-.6c-10.8-3.2-25-7.5-36.4-14.4c-13.5-8.1-26.5-22-26.6-44.1c-.1-22.9 12.9-38.6 27.7-47.4c6.4-3.8 13.3-6.4 20.2-8.2V24c0-13.3 10.7-24 24-24s24 10.7 24 24zM568.2 336.3c13.1 17.8 9.3 42.8-8.5 55.9L433.1 485.5c-23.4 17.2-51.6 26.5-80.7 26.5H192 32c-17.7 0-32-14.3-32-32V416c0-17.7 14.3-32 32-32H68.8l44.9-36c22.7-18.2 50.9-28 80-28H272h16 64c17.7 0 32 14.3 32 32s-14.3 32-32 32H288 272c-8.8 0-16 7.2-16 16s7.2 16 16 16H392.6l119.7-88.2c17.8-13.1 42.8-9.3 55.9 8.5zM193.6 384l0 0-.9 0c.3 0 .6 0 .9 0z" /></svg>
                            <p>{props.item.takeplace}</p></div>


                </div>
                <div class={isFull ? "bg-danger text-white " : "bg-success text-white "}  style={{ width: '50px', borderRadius: '7px', textAlign: 'center' }}>
                    <p style={{ fontSize: '16px' }}>{isFull ? 'close' : 'open'}</p>                    
                </div>
                </div>
            </div>
    )

}
export default Card