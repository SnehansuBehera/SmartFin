import React, { useState, useEffect } from 'react';
import Button from '../assets/Button';
import Authform from './Authform';
import Modal from '../assets/Modal';
import CursorAnimation from '../assets/Cursor';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router';

const Landing = () => {
    const navigate = useNavigate();
    const [session, setSession] = useState(null);
    const [cursorVisible, setCursorVisible] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

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

    const handlePush = () => {
        if (session) {
            navigate('/dashboard');
        } else {
            setModalVisible(true);
        }
    };

    const hideCursor = () => {
        setCursorVisible(!cursorVisible);
    };

    return (
        <div className='relative'>
            <CursorAnimation show={cursorVisible} />
            <div className='flex max-w-[1200px] mx-auto justify-between mt-20 mb-32'>
                <div className='flex flex-col items-start w-[45rem] gap-7'>
                    <div className='flex flex-col gap-6'>
                        <h1
                            onMouseOver={hideCursor}
                            onMouseLeave={hideCursor}
                            className='w-[32rem] rounded-lg duration-150 text-white text-6xl font-extrabold leading-[4rem] hover:ring-1 hover:ring-[#00BD9B]'
                        >
                            Manage personal finance <span>3x</span> better
                        </h1>
                        <p
                            onMouseOver={hideCursor}
                            onMouseLeave={hideCursor}
                            className='w-[35rem] text-md hover:ring-1 hover:ring-[#00BD9B] rounded-lg duration-200 delay-200 leading-[1.5rem] font-normal text-gray-400'
                        >
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate dignissimos reiciendis autem id sunt. Fugiat a nulla minus perspiciatis quaerat, veritatis quia optio libero dolor sequi placeat itaque voluptate provident. Atque officia quod facere fugit adipisci doloribus quas sequi debitis nemo ex maxime explicabo alias pariatur reprehenderit, et, dicta suscipit? Dolores enim esse ab tempora, ex provident eum voluptate architecto.
                        </p>
                    </div>
                    <div className='flex justify-start items-center gap-5'>
                        <Button
                            url={handlePush}
                            text={session ? "Dashboard" : "Get Started"}
                            bgColor={"#00BD9B"}
                            textColor={"black"}
                        />
                        <Button text={"Learn more"} bgColor={"transparent"} textColor={"#00BD9B"} />
                    </div>
                </div>
                <div>
                    <img src="./Images/landing-img.png" alt="img" className=' w-[32rem] ' />
                </div>

                <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
                    <Authform />
                </Modal>
            </div>
        </div>
    );
};

export default Landing;
