import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import Services from './Services';
import BookingModal from './BookingModal';

const Availableappoinment = ({ date, setDate }) => {
    const [services, setServices] = useState([]);
    const [treatment, setTreatment] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/service')
            .then(res => res.json())
            .then(data => setServices(data))
    }, []);

    return (
        <div>
            <h2 className='text-xl text-secondary text-center my-12'>Available Appointments on {format(date, 'PP')}</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' >
                {
                    services.map(service => <Services
                        key={service._id}
                        service={service}
                        setTreatment={setTreatment}
                    ></Services>)
                }
            </div >
            {treatment && <BookingModal date={date} treatment={treatment}></BookingModal>}
        </div >
    );
};

export default Availableappoinment;