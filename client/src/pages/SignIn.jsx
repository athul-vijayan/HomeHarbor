import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useSelector, useDispatch } from 'react-redux'
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice'

export default function SignIn() {
  const [formData, setFormData]=useState({})
  const {loading, error}=useSelector((state)=>state.user )
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const handleChange=(e)=>{
    setFormData({...formData, [e.target.id]:e.target.value})
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      dispatch(signInStart())
      const res= await fetch('/api/auth/signin', {
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      })
      const data=await res.json()
      console.log(data);

      if(data.success===false){
        dispatch(signInFailure(data.message))
        return
      }
      dispatch(signInSuccess(data))
      navigate('/')
      
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  }

  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form className='flex flex-col gap-4' action="">
        <input id='email' onChange={handleChange} className='border p-3 rounded-lg' type="email" placeholder='email' />
        <input id='password' onChange={handleChange} className='border p-3 rounded-lg' type="password" placeholder='password' />
        <button onClick={handleSubmit} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading?'Loading...':'Sign In'}
        </button>


      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account ?</p>
        <Link to='/sign-up'>
          <span className='text-blue-700'>Sign Up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
