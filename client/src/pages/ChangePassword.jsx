import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Navbar from '../components/Navbar'

const ChangePassword = () => {
    axios.defaults.withCredentials = true

    const { backendUrl, isLoggedin, getUserData, userData, setIsLoggedin } = useContext(AppContext)


    const navigate = useNavigate()
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        if (!isLoggedin) {
            navigate('/')
        }
    }, [isLoggedin, userData])


    const changePassword = async (e) => {
        e.preventDefault()

        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.error('All fields are required')
            return
        }

        if (newPassword !== confirmPassword) {
            toast.error('New password and confirm password do not match')
            return
        }

        try {
            const { data } = await axios.post(backendUrl + '/api/auth/change-password', { currentPassword, newPassword })
            if (data.success) {
                toast.success(data.message)
                setCurrentPassword('')
                setNewPassword('')
                setConfirmPassword('')
                
                setIsLoggedin(false)
                await axios.post(backendUrl + '/api/auth/logout')
                window.location.reload()
                navigate('/')

            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    return (
        <div className='flex flex-col items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400 to-pink-500'>
            <Navbar />
            <form onSubmit={changePassword} className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>
                <h2 className='text-3xl font-semibold text-white text-center mb-3'>Change Password</h2>
                <p className='text-center text-sm mb-6'>Change your password</p>

                <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                    <input type={showPassword ? 'text' : 'password'}
                        placeholder='Current Password'
                        className='bg-transparent outline-none w-full'
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)} />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-indigo-300 hover:text-white focus:outline-none"
                    >
                        {showPassword ?
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                            </svg> :
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                        }
                    </button>
                </div>

                <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                    <input type={showPassword ? 'text' : 'password'}
                        placeholder='New Password'
                        className='bg-transparent outline-none w-full'
                        minLength={8}
                        pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)} />
                        <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-indigo-300 hover:text-white focus:outline-none"
                    >
                        {showPassword ?
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                            </svg> :
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                        }
                    </button>
                </div>

                <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                    <input type={showPassword ? 'text' : 'password'}
                        placeholder='Confirm New Password'
                        className='bg-transparent outline-none w-full'
                        minLength={8}
                        pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} />
                        <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-indigo-300 hover:text-white focus:outline-none"
                    >
                        {showPassword ?
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                            </svg> :
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                        }
                    </button>
                </div>

                <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium'>Change Password
                </button>
            </form>

        </div>
    )
}

export default ChangePassword
