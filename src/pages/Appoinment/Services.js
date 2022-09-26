import React from 'react';

const Services = ({ service, setTreatment }) => {
    const { name, slots } = service;
    return (
        <div className="card  bg-base-100 shadow-xl text-center" >
            <div className="card-body" >
                <h2 className="text-xl font-bold text-secondary" > {name}</h2 >
                <p>{
                    slots.length > 0
                        ? <span>{slots[0]}</span>
                        : <span className='text-red-500' > Try Another day</span>
                }</p>
                <p >{slots.length} spaces available</p>
                <div className="card-actions justify-center" >
                    <label htmlFor="booking-modal-3"
                        disabled={slots.length === 0}
                        onClick={() => setTreatment(service)}
                        className="btn btn-secondary text-white uppercase bg-gradient-to-r from-secondary to-primary" > Book Appoinment</label >
                </div >
            </div >
        </div >
    );
};

export default Services;