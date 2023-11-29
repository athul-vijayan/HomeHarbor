import React, { useEffect, useRef, useState } from 'react'
import {useSelector}  from 'react-redux'
import {app} from '../firebaseConfig'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'

export default function Profile() {
  const fileRef=useRef(null)
  const {currentUser}=useSelector((state)=>state.user)
  const [file, setFile]=useState(undefined)
  const [filePerc, setFilePerc]=useState(0)
  const [fileUploadError, setFileUploadError]=useState(false)
  const [formData, setFormData]=useState({})

  //firebase Storage
  //allow read;
  //allow write : if
  //request.resource.size<2*1024*1024 &&
  //request.resource.contentType.matches('image/.*')

  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  },[file])

 
const handleFileUpload=(file)=>{
    const firebaseStorage = getStorage(app)
    const storageLocation = file.name + new Date().getTime()
    const firebaseStorageRef = ref(firebaseStorage, storageLocation)
    const uploadTask=uploadBytesResumable(firebaseStorageRef, file)
    uploadTask.on(
      'state_changed', 
      (snapshot)=>{
        const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
        setFilePerc(Math.round(progress))
      },
      (error)=>{
        setFileUploadError(true)
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then(
          (downloadURL)=>setFormData({...formData, avatar: downloadURL})
        )
      }
      
    )
  }  

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4' action="">
        <input type="file" ref={fileRef} hidden accept='image/*'
          onChange={(e)=>setFile(e.target.files[0])}/>
        <img
          onClick={()=>fileRef.current.click()}
          src={formData.avatar||currentUser.avatar}
          alt='profle'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
        <p>
          {fileUploadError? 
          (<span>
            Image Upload Failed 
          </span>)
          :filePerc>0 && filePerc<100 ?
          (<span>`Uploading ${filePerc}%`</span>)
          :filePerc===100 ? (
            <span>Image updated</span>
          ):('')
        }
        </p>
        <input className='border p-3 rounded-lg' type="text" placeholder='username' id='username'/>
        <input className='border p-3 rounded-lg' type="email" placeholder='email' id='email'/>
        <input className='border p-3 rounded-lg' type="password" placeholder='password' id='password'/>
        <button
        className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
        >update</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}
