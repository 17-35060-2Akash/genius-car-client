import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import image from '../../assets/images/checkout/checkout.png';
import './Checkout.css';

const Checkout = () => {
    const service = useLoaderData();
    const { _id, title, price } = service;
    const { user } = useContext(AuthContext);

    const handlePlaceOrder = event => {
        event.preventDefault();
        const form = event.target;
        const name = `${form.firstname.value} ${form.lastname.value}`;
        const email = user?.email || 'unregistered';
        const phone = form.phone.value;
        const message = form.message.value;

        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email,
            phone,
            message
        }
        /*  if(phone.length <10){
             alert('Phone Number Should be 10 numbers or longer')
         }
  */

        fetch('https://genius-car-server-xi.vercel.app/orders/', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.acknowledged) {
                    alert('Order Received Successfully!');
                    form.reset();
                }
            })
            .catch(error => console.error(error))

    }

    return (
        <div>
            <div className=''>
                <div className=''>
                    <img src={image} alt='' className="w-full rounded-xl " />
                </div>
            </div>

            <div className="py-10 my-20 text-center ">
                <h1 className='text-4xl font-bold '>You are about to order: <span className='text-orange-600'>{title}</span></h1>
                <p className='text-3xl font-semibold py-5 text-orange-600'>Price: {price}</p>
            </div>

            <form onSubmit={handlePlaceOrder} className='p-24 bg-slate-100 mt-18 mb-24'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <input type="text" name='firstname' placeholder="First Name" className="input input-ghost w-full bg-white" />
                    <input type="text" name='lastname' placeholder="Last Name" className="input input-ghost w-full bg-white" />
                    <input type="text" name='phone' placeholder="Your Phone" className="input input-ghost w-full bg-white" required />
                    <input type="text" name='email' placeholder="Your Email" defaultValue={user?.email} className="input input-ghost w-full bg-white" readOnly />
                </div>
                <textarea name='message' className="textarea  h-24 w-full py-5 my-5 bg-white" placeholder="Your Message" required></textarea>
                <input className='btn bg-orange-600 border-0 w-full h-16' type='submit' value='Place Your Order' />
            </form>
        </div>
    );
};

export default Checkout;