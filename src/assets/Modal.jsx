import React, { useEffect, useState } from 'react'

const Modal = ({ isOpen, onClose, children }) => {


    return (
        <>
            {isOpen && <div className='fixed inset-0 flex items-center justify-center z-50'>
                <div className='fixed inset-0 bg-black opacity-75 transition-opacity duration-75'></div>
                <div className='absolute top-[20%] right-[42%] ring-2 ring-[#00BD9B] bg-[#121418] p-4 rounded-lg z-10 px-6'>
                    <button className='text-[#00BD9B] text-right  font-bold text-lg hover:text-gray-700 focus:outline-none mr-2' onClick={onClose}>X</button>
                    {children}
                </div>
            </div>}</>


    )
}

export default Modal