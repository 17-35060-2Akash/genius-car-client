import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import OrderRow from './OrderRow';
import bannerimg from '../../assets/images/checkout/checkout.png'

const Orders = () => {
    const { user, logOut } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch(`https://genius-car-server-xi.vercel.app/orders?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    logOut();
                }
                return res.json();
            })
            .then(data => {
                console.log(data);
                setOrders(data);
            })
    }, [user?.email, logOut]);

    const handleDelete = id => {
        const agreed = window.confirm(`Are You sure to delete your service order?`)
        if (agreed) {
            fetch(`https://genius-car-server-xi.vercel.app/orders/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('genius-token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        alert('Deleted Successfully!');
                        const remaining = orders.filter(odr => odr._id !== id);
                        setOrders(remaining)
                    }
                })
        }
    };

    const handleStatusUpdate = id => {
        fetch(`https://genius-car-server-xi.vercel.app/orders/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
            },
            body: JSON.stringify({ status: 'Approved' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    const remaining = orders.filter(odr => odr._id !== id);
                    const approving = orders.find(odr => odr._id === id);
                    approving.status = 'Approved';

                    const newOrders = [...remaining, approving];
                    setOrders(newOrders);
                }
            })
    }

    return (
        <div>
            <div>
                <img className='w-full' src={bannerimg} alt="" />
            </div>
            <h2 className='text-4xl text-center py-20 text-orange-500 font-semibold'>You have {orders.length} orders</h2>
            <div className="overflow-x-auto w-full mb-32">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th>
                                {/* <label>
                                    <input type="checkbox" className="checkbox" />
                                </label> */}
                            </th>
                            <th>Name</th>
                            <th>Service</th>
                            <th>Service Id</th>
                            <th>Message</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order => <OrderRow
                                key={order._id}
                                order={order}
                                handleDelete={handleDelete}
                                handleStatusUpdate={handleStatusUpdate}></OrderRow>)
                        }
                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default Orders;