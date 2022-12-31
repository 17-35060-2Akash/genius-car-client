import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {
    const [services, setServices] = useState([]);
    const [isAscending, setIsAscending] = useState(true);
    const searchRef = useRef();
    const [search, setSearch] = useState('');

    useEffect(() => {
        // fetch('https://genius-car-server-xi.vercel.app/services')
        fetch(`https://genius-car-server-xi.vercel.app/services?search=${search}&order=${isAscending ? 'asc' : 'dsc'}`)
            .then(res => res.json())
            .then(data => setServices(data))
    }, [isAscending, search]);

    const handleSearch = () => {
        setSearch(searchRef.current.value);
    }

    return (
        <div>
            <div className='text-center py-4 mb-7'>
                <p className="text-2xl font-bold text-orange-600">Services</p>
                <h2 className='text-5xl font-semibold py-4'>Our Service Area</h2>
                <p>the majority have suffered alteration in some form, by injected humour,
                    or randomised
                    <br /> words which don't look even slightly believable. </p>
            </div>
            <div className='mx-auto text-center'>
                <input ref={searchRef} className='input w-1/2 bg-slate-200 p-3 mr-3 font-20 rounded-lg' type="text" name="" id="" />
                <button onClick={handleSearch} className='btn'>Search</button>
            </div>
            <div className='text-end'>
                <button className='btn btn-secondary my-5 mr-7' onClick={() => setIsAscending(!isAscending)}>{isAscending ? 'Descindng' : 'Ascending'}</button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-20'>
                {
                    services.map(service => <ServiceCard
                        key={service._id}
                        service={service}></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;