import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getSession } from '../actions/getSession';

const PrivateRoutes = () => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchSession = async () => {
            const sessionData = await getSession();
            setSession(sessionData);
            setLoading(false);
        };

        fetchSession();
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }
    console.log(session)
    return session.session?.access_token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
