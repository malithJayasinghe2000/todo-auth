import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Hero = () => {
  const {userData} = useContext(AppContext)
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-3xl sm:text-5xl font-semibold mb-4'>Hello {userData ? userData.name : 'Guest'} !</h1>
      <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>Welcome to Our Todo-App</h2>
      <p className='mb-8 max-w-md'>Let's do our task in right time</p>
      <button className='border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all'>Get Started</button>
    </div>
  )
}

export default Hero
