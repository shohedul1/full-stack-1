'use client';

import React, { useState } from 'react'

export default function ContactForm() {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log('fullname', fullname);
        console.log('email', email);
        console.log('message', message);

        const res = await fetch ("api/contact", {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                fullname,
                email,
                message,
            }),
        });
        
        const {msg} = await res.json();
        setError(msg);
        console.log(error);

    };

    return (
        <>
        <form onSubmit={handleSubmit} className='py-4 mt-4 border-t flex flex-col gap-5'>
            <div>
                <label htmlFor="fullname">Full Name</label>
                <input 
                value={fullname}
                onChange={(e)=> setFullname(e.target.value)}
                type="text" id="fullname" placeholder='John Doe' />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input 
                value={email}
                onChange={(e)=> setEmail(e.target.value)} 
                type="text" id="email" placeholder='John@gmil.com ' />
            </div>
            <div>
                <label htmlFor="message">Your Message</label>
                <textarea
                value={message}
                onChange={(e)=> setMessage(e.target.value)} 
                className='h-32' id="message" placeholder='Type your message here'></textarea>
            </div>

            <button className='bg-green-700 p-3 text-white font-bold' type='submit'>Send</button>
        </form>

        <div className='bg-slate-100 flex flex-col'>
            {error && error.map((e)=>(
                <div className='text-red-600 px-5 py-2'>{e}</div>
            ))}
        </div>
        </>
    )
}
