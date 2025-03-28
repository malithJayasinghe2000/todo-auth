import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Navbar = () => {

    const navigate = useNavigate()
    const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContext)

    const logout = async () => {
        try {

            axios.defaults.withCredentials = true
            const { data } = await axios.post(backendUrl + '/api/auth/logout')
            if (data.success) {
                setIsLoggedin(false)
                setUserData(false)
                navigate('/')
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0 bg-white/80 backdrop-blur-sm shadow-sm'>
            <button onClick={() => navigate('/')} className='text-xl font-bold text-gray-800 tracking-tight hover:text-blue-600 transition-colors'>
                <span className='text-blue-600'>TODO</span>App
            </button>
            {userData ?
                <div className='relative group'>
                    <div className='w-10 h-10 flex justify-center items-center rounded-full bg-blue-600 text-white font-medium shadow-md hover:bg-blue-700 transition-colors cursor-pointer'>
                        {userData.name[0].toUpperCase()}
                    </div>
                    <div className='absolute hidden group-hover:block top-full right-0 z-10 mt-2 transition-all duration-300 ease-in-out'>
                        <div className='py-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 min-w-48'>
                            <div className='px-4 py-2 text-sm text-gray-500 border-b border-gray-100'>
                                <p className='font-medium text-gray-700'>{userData.name}</p>
                            </div>
                            <ul className='list-none m-0 py-1'>
                                <li onClick={() => navigate('/dashboard')} className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer flex items-center'>
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                    Dashboard
                                </li>
                                <li onClick={() => navigate('/change-password')} className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer flex items-center'>
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                                    Change Password
                                </li>
                                <li onClick={logout} className='px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer flex items-center'>
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                    Logout
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                :
                <button onClick={() => navigate('/login')} className='flex items-center gap-2 border border-blue-500 rounded-full px-6 py-2 text-blue-600 hover:bg-blue-50 transition-all font-medium'>
                    Login
                </button>
            }
        </div>
    )
}

export default Navbar
