import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import {app} from '../firebaseConfig'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signInSuccess } from '../redux/user/userSlice'

export default function OAuth() {
    const dispatch = useDispatch()
    const navigate= useNavigate()

    const handleGoogleSignIn=async ()=>{
        try{
            const provider=new GoogleAuthProvider()
            const auth = getAuth(app)
            const googleSignInResult=await signInWithPopup(auth, provider)

            const res= await fetch('api/auth/google',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    name: googleSignInResult.user.displayName,
                    email:googleSignInResult.user.email,
                    photo:googleSignInResult.user.photoURL
                })
            })
            const data=await res.json()
            dispatch(signInSuccess(data))
            navigate('/')


        }catch(error){
            console.log('Could not sign in with google', error);

    }
    }
    
  return (
    <button onClick={handleGoogleSignIn} type='button' 
    className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
        Continue with google
    </button>
  )
}
