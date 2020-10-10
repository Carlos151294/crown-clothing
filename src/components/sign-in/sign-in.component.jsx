import React, { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import CustumButton from '../custom-button/custom-button.component';

import { signInWithGoogle, auth } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            await auth.signInWithEmailAndPassword(email, password);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="sign-in">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput name="email" id="email" type="email"
                    handleChange={event => setEmail(event.target.value)}
                    value={email} 
                    label="Email"
                    required
                        />
                <FormInput name="password" id="password" type="password"
                    value={password}
                    handleChange={event => setPassword(event.target.value)}
                    label="Password"
                    required
                        />

                <div className="buttons">
                    <CustumButton type="submit">Sign in</CustumButton>
                    <CustumButton type="button" onClick={signInWithGoogle} isGoogleSignIn>
                        Sign in with Google
                    </CustumButton>
                </div>
            </form>
        </div>
    )
}

export default SignIn;