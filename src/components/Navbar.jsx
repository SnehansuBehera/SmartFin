import React, { useState, useEffect } from 'react'
import Modal from '../assets/Modal';
import Authform from './Authform';
import { supabase } from '../supabaseClient';
import CursorAnimation from '../assets/Cursor'
import { useNavigate } from 'react-router';
import clsx from 'clsx';
import { CiLogout } from "react-icons/ci";
import { MdArrowDropDown } from "react-icons/md";




const Navbar = ({ setToken }) => {

    const navigate = useNavigate();
    const [dropDown, setDropDown] = useState(false);
    const [cursorVisible, setCursorVisible] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [session, setSession] = useState(null);

    const openDropDown = () => {
        setDropDown(!dropDown);
    }
    const logout = async () => {
        await supabase.auth.signOut();
    }

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const { data: authListener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
                if (session) {
                    setModalVisible(false);


                }
            }
        );

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);
    console.log(session);



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
                <div className='flex items-center justify-end gap-12'>
                    <button onClick={() => {
                        if (!session) {
                            setModalVisible(true);
                        } else {
                            logout();
                        }

                    }} className={clsx(!session?.access_token ? 'text-white bg-transparent rounded-md hover:rounded-2xl py-2 px-8 ring-1 ring-[#00BD9B]' : 'text-[#00BD9B] hover:text-white hover:ring-1 hover:ring-[#00BD9B] hover:rounded-lg hover:p-1 hover:duration-200 hover:delay-200')}><span className='font-semibold '>{session ?
                        <div className='flex items-center justify-start gap-2'>
                            <CiLogout size={28} className='' />
                            <p>LOGOUT</p>
                        </div>

                        : 'LOGIN'}</span></button>
                    {
                        session?.access_token &&

                        <div className='flex items-center justify-end gap-1 relative'>
                            <div className='rounded-full bg-[#00BD9B] overflow-hidden'>
                                <img src={session?.user?.user_metadata.avatar_url || "/Images/person.png"} alt="profile" className=' object-cover w-[3rem]' />
                            </div>
                            <button onClick={openDropDown}>
                                <MdArrowDropDown size={32} className='text-[#00BD9B]' />
                            </button>
                            {dropDown &&
                                <div className='absolute top-[4.2rem] right-[1rem] bg-[#00BD9B] py-4 px-2 w-[15rem] rounded-lg flex flex-col items-center justify-center gap-4 z-50'>
                                    <p className='text-lg font-semibold text-white leading-4'>Welcome!</p>
                                    <p className='text-xl font-bold text-white leading-[1rem]'>{session?.user?.user_metadata?.full_name}</p>
                                </div>
                            }


                        </div>

                    }
                </div>
                <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
                    <Authform setToken={setToken} />
                </Modal>


            </div>
        </>
    )
}

export default Navbar
