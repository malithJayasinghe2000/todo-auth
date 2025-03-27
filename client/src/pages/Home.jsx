import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400 to-pink-500'>
      <Navbar />
      <Hero />
    </div>
  )
}

export default Home
