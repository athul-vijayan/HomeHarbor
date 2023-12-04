import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function ContactLandlord({listing}) {
    const [landlord, setLandlord]=useState(null)
    const [message, setMessage]=useState('')
    const onChange=(e)=>setMessage(e.target.value)

    const fetchLandLord=async()=>{
        try {
            const res = await fetch(`/api/user/${listing.userRef}`)
            const data= await res.json()
            setLandlord(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchLandLord()
    },[listing.userRef])

    const landlordName=landlord.username[0].toUpperCase()+landlord.username.slice(1).toLowerCase()

    // useEffect(fetchLandLord,[listing.userRef])

  return (
    <div>
        {
            landlord && (
                <div className="flex flex-col gap-2">
                    <p>Contact {' '}
                    {
                        
                    }
                        <span className='font-semibold'>{landlordName}</span>
                        {' '}for{' '}
                        <span className="font-semibold">{listing.name.toLowerCase()}</span>

                    </p>
                    <textarea
            name='message'
            id='message'
            rows='2'
            value={message}
            onChange={onChange}
            placeholder='Enter your message here...'
            className='w-full border p-3 rounded-lg'
          ></textarea>

          <Link
          className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
          to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}>
          Send Message
          </Link>

                </div>
            )
        }
    </div>
  )
}
