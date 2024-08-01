import React, { useState } from 'react'
import Sidebar from './Sidebar'
import { supabase } from '../supabaseClient';

import Budget from './BodySpace';


const Dashboard = () => {
    const [session, setSession] = useState(null);
    supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
    });

    return (
        <div className='flex h-[100vh] gap-1 bg-black p-2'>
            <Sidebar />
            <div className='h-full w-full flex flex-col gap-1'>
                <div>
                    <div className='bg-zinc-800 text-white rounded-lg py-3 px-4 font-semibold text-lg flex gap-6 items-center justify-start'>
                        <div className='rounded-full bg-[#00BD9B] overflow-hidden'>
                            <img src={session?.user?.user_metadata.avatar_url || "/Images/person.png"} alt="profile" className=' object-cover w-[2rem]' />
                        </div>
                        <p>Welcome! <span className='text-[#00BD9B]'>{session?.user?.user_metadata.name}</span></p>
                    </div>

                </div>
                <Budget />

            </div>
        </div>
    )
}

export default Dashboard
