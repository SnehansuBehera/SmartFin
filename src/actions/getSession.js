import { supabase } from '../supabaseClient';

export const getSession = async () => {
    try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
            console.error('Error getting session:', error);
            return null;
        }
        return data || null;
    } catch (err) {
        console.error('Unexpected error:', err);
        return null;
    }
};
