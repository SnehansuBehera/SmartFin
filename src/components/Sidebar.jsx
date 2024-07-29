import React from 'react'
import { IoStatsChartSharp } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router';


const Sidebar = () => {
    const navigate = useNavigate();
    const logout = async () => {
        await supabase.auth.signOut();
        navigate('/');
    }
    return (
        <div className='flex flex-col justify-between bg-zinc-800 rounded-lg px-4 py-2 w-[10rem]'>
            <div className='  text-white flex flex-col gap-10'>
                <p className='font-extrabold text-[#00BD9B] text-xl'>SMARTFIN.</p>
                <ul className=' list-none '>
                    <li className='flex items-center justify-start gap-4 mb-8 cursor-pointer'>
                        <IoStatsChartSharp className='text-white' />
                        <p className='text-sm font-bold hover:text-[#00BD9B]'>HISTORY</p>
                    </li>
                    <li className='flex items-center justify-start gap-4 mb-8 cursor-pointer'>
                        <IoStatsChartSharp className='text-white' />
                        <p className='text-sm font-bold hover:text-[#00BD9B]'>SAVINGS</p>
                    </li>
                    <li className='flex items-center justify-start gap-4 cursor-pointer'>
                        <IoStatsChartSharp className='text-white' />
                        <p className='text-sm font-bold hover:text-[#00BD9B]'>PURSE</p>
                    </li>

                </ul>
            </div>


            <button onClick={logout} className='flex items-center justify-start gap-4 mb-4'>
                <CiLogout size={20} className='text-white' />
                <p className='text-sm text-white font-bold hover:text-[#00BD9B]'>LOGOUT</p>
            </button>
        </div>
    )
}

export default Sidebar
