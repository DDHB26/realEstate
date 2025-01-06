import React from 'react'
import { useSelector } from 'react-redux'

export default function profile() {
  const { currentUser } = useSelector((state) => state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'> Bhajnit Singh Hooda
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <img src={currentUser.avatar} alt="profile" className='w-24 h-24 rounded-full object-cover self-center cursor-pointe mt-2' /> {/* self-center is used to center the image similar to text- centre used to centre the text */}
        <input type="text" placeholder='username' className='border p-3 rounded-lg  ' id='username' />
        <input type="text" placeholder='email' className='border p-3 rounded-lg  ' id='email'/>
        <input type="text" placeholder='password' className='border p-3 rounded-lg  ' id='password'/>
        <button className='bg-blue-500 text-white p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-70'>Update</button>
      </form>
      <div className='flex justify-between  mt-5'>
        <span className='text-red-500 cursor-pointer'>Delete account</span>
        <span className='text-red-500 cursor-pointer'>Sign out</span>
      </div>
    </div>
    
  )
}
