import React, { } from 'react'
import { supabase } from '../supabaseClient';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared'




const Authform = () => {


    return (
        <div>

            <Auth providers={["google"]} supabaseClient={supabase}
                appearance={{
                    theme: ThemeSupa, style: {
                        input: { color: 'white', paddingLeft: '1rem', paddingRight: '8rem', borderRadius: '0.4rem' },
                        button: { color: 'black', fontWeight: 'bold', borderRadius: '0.4rem' },
                        anchor: { color: '#00BD9B', },


                    },
                }}
                localization={{
                    variables: {
                        sign_in: {
                            email_label: '',
                            password_label: '',
                            email_input_placeholder: 'Email',
                            password_input_placeholder: 'Enter Password'
                        },
                        sign_up: {
                            email_label: '',
                            password_label: '',
                            email_input_placeholder: 'Email',
                            password_input_placeholder: 'Create Password'
                        },
                    },
                }}


            />





        </div>
    )
}

export default Authform
