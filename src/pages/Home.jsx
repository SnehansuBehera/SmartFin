import React, { useState } from 'react'
import Navbar from "../components/Navbar"
import Landing from '../components/Landing'
import Footer from '../components/Footer'


const Home = () => {

    return (
        <div className='bg-[#121418] h-[100vh] relative'>
            <img src="./Images/bg-image.jpg" alt="image" className='absolute object-cover opacity-10 h-full w-full pointer-events-none' />
            <Navbar />
            <Landing />
            <Footer />
        </div>
    )
}

export default Home
