import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
    const navigate = useNavigate()

    const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext)

    const [state, setState] = useState('Sign Up')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e) => {

        try {
            e.preventDefault()  //when press the submit button prevent the website from refreshing

            axios.defaults.withCredentials = true //send the cookies with below request

            if (state === 'Sign Up') {
                const { data } = await axios.post(backendUrl + '/api/auth/register', {
                    name, email, password
                })
                if (data.success) {
                    setIsLoggedin(true)
                    getUserData()
                    navigate('/dashboard')
                } else {
                    toast.error(data.message)
                }
            } else {
                const { data } = await axios.post(backendUrl + '/api/auth/login', {
                    email, password
                })
                if (data.success) {
                    setIsLoggedin(true)
                    getUserData()
                    navigate('/dashboard')
                } else {
                    toast.error(data.message)
                }
            }

        } catch (error) {
            toast.error(error.message)
        }

    }

    return (
        <div className='flex flex-col items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400 to-pink-500'>
            <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0 bg-white/80 backdrop-blur-sm shadow-sm'>
                <button onClick={() => navigate('/')} className='text-xl font-bold text-gray-800 tracking-tight hover:text-blue-600 transition-colors'>
                    <span className='text-blue-600'>TODO</span>App
                </button>
            </div>
            <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>
                <h2 className='text-3xl font-semibold text-white text-center mb-3'>{state === 'Sign Up' ? 'Create account' : 'Login'}</h2>
                <p className='text-center text-sm mb-6'>{state === 'Sign Up' ? 'Create your account' : 'Login to your account!'}</p>

                <form onSubmit={onSubmitHandler}>
                    {state === 'Sign Up' && (
                        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C] '>
                            <input
                                onChange={e => setName(e.target.value)}
                                value={name}
                                className='bg-transparent outline-none' type='text' placeholder='Full Name' />
                        </div>
                    )}

                    <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C] '>
                        <input
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            className='bg-transparent outline-none' type='email' placeholder='Email' />
                    </div>

                    <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C] '>
                        <input
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            className='bg-transparent outline-none' type='password' placeholder='Password' />
                    </div>

                    <p onClick={() => navigate('/reset-password')} className='mb-4 text-indigo-500 cursor-pointer'>
                        Forgot Password
                    </p>

                    <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium'>{state}</button>
                    {state === 'Sign Up' ? (
                        <p className='text-gray-400 text-center text-xs mt-4'>
                            Already have an account?{' '}
                            <span onClick={() => setState('Login')} className='text-blue-400 cursor-pointer underline'>Login here</span>
                        </p>
                    ) : (
                        <p className='text-gray-400 text-center text-xs mt-4'>
                            Don't have an account?{' '}
                            <span onClick={() => setState('Sign Up')} className='text-blue-400 cursor-pointer underline'>Sign up</span>
                        </p>
                    )}


                </form>
            </div>
        </div>
    )
}

export default Login
