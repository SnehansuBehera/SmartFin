import React, { useState, useEffect } from 'react'
import Modal from '../assets/Modal';
import Authform from './Authform';
import { supabase } from '../supabaseClient';
import CursorAnimation from '../assets/Cursor'





const Navbar = ({ setToken }) => {


    const [cursorVisible, setCursorVisible] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [session, setSession] = useState(null);


    const logout = async () => {
        await supabase.auth.signOut();
    }

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })
        if (session) {
            setSession(session);

            setModalVisible(false);
        }


    }, [session])


    return (
        <>
            <CursorAnimation show={cursorVisible} />
            <div className='max-w-[1200px] mx-auto flex justify-between items-center pt-8'>

                <div className='flex items-end justify-start gap-20'>
                    <div className=''>
                        <p className='text-[#00BD9B] font-extrabold text-4xl'>SMARTFIN.</p>
                    </div>
                    <ul className='flex gap-6'>
                        <li><p className='text-gray-400 text-sm font-semibold hover:text-[#288d7a] cursor-pointer'>HOME</p></li>
                        <li><p className='text-gray-400 text-sm font-semibold hover:text-[#288d7a] cursor-pointer'>GUIDE</p></li>
                    </ul>

                </div>

                <button onClick={() => {
                    if (!session) {
                        setModalVisible(true);
                    } else {
                        logout();
                    }

                }} className='text-white bg-transparent rounded-md hover:rounded-2xl py-2 px-8 ring-1 ring-[#00BD9B]'><span className='font-semibold '>{session ? 'LOGOUT' : 'LOGIN'}</span></button>
                <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
                    <Authform setToken={setToken} />
                </Modal>
            </div>
        </>
    )
}

export default Navbar
