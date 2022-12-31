import React, { useEffect, useState } from 'react';

const OrderRow = ({ order, handleDelete, handleStatusUpdate }) => {
    const { _id, serviceName, price, phone, service, customer, message, status } = order;
    const [orderService, setOrderService] = useState({});

    useEffect(() => {
        fetch(`https://genius-car-server-xi.vercel.app/services/${service}`)
            .then(res => res.json())
            .then(data => setOrderService(data))
    }, [service]);




    return (
        <tr>
            <th>
                <label>
                    {/* <button className='btn btn-ghost'>X</button> */}
                    <button onClick={() => handleDelete(_id)} className="btn btn-square btn-outline border-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </label>
            </th>

            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="rounded w-24 h-24 mx-5">
                            {orderService?.img &&
                                <img src={orderService.img} alt="Avatar Tailwind CSS Component" />
                            }
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{customer}</div>
                        <div className="text-sm opacity-50">{phone}</div>
                    </div>
                </div>
            </td>
            <td>
                {serviceName}
                <br />
                <span className="badge badge-ghost badge-sm">${price}</span>
            </td>
            <td>{service}</td>
            <th>
                <button className="btn btn-ghost btn-xs">{message}</button>
            </th>
            <th>
                <button onClick={() => handleStatusUpdate(_id)} className="btn btn-outline-error border-0 bg-orange-500">{status ? status : 'Pending'}</button>
            </th>
        </tr>
    );
};

export default OrderRow;