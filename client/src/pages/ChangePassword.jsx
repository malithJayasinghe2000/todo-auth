import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const ChangePassword = () => {
    axios.defaults.withCredentials = true

    const {backendUrl,isLoggedin, getUserData,userData,setIsLoggedin} = useContext(AppContext)
    

    const navigate = useNavigate()
    const [currentPassword,setCurrentPassword] = useState('')
    const [newPassword,setNewPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')

    useEffect(()=>{
        if(!isLoggedin){
            navigate('/')
        }
    },[isLoggedin, userData])
    

    const changePassword = async ()=>{
        if(!currentPassword || !newPassword || !confirmPassword){
            toast.error('All fields are required')
            return
        }

        if(newPassword !== confirmPassword){
            toast.error('New password and confirm password do not match')
            return
        }

        try{
            const {data} = await axios.post(backendUrl+'/api/auth/change-password', {currentPassword, newPassword})
            if(data.success){
                toast.success(data.message)
                setCurrentPassword('')
                setNewPassword('')
                setConfirmPassword('')
                setIsLoggedin(false)
                await axios.post(backendUrl+'/api/auth/logout')
                navigate('/login')
            }else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error(error.message)
        }
    }
    

  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400 to-pink-500'>
      <button onClick={()=>navigate('/')} className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'>TODO</button>

        <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>
            <h2 className='text-3xl font-semibold text-white text-center mb-3'>Change Password</h2>
            <p className='text-center text-sm mb-6'>Change your password</p>
            <input type='password' placeholder='Current Password' className='w-full p-2 mb-4 rounded-lg bg-slate-800 text-indigo-300' value={currentPassword} onChange={(e)=>setCurrentPassword(e.target.value)} />
            <input type='password' placeholder='New Password' className='w-full p-2 mb-4 rounded-lg bg-slate-800 text-indigo-300' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} />
            <input type='password' placeholder='Confirm New Password' className='w-full p-2 mb-4 rounded-lg bg-slate-800 text-indigo-300' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
            <button onClick={changePassword} className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium'>Change Password
</button>
            </div>

    </div>
  )
}

export default ChangePassword
