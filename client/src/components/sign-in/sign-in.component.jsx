import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustumButton from '../custom-button/custom-button.component';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions'

import './sign-in.styles.scss';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async event => {
        event.preventDefault();
        dispatch(emailSignInStart({email, password}));
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
                    <CustumButton type="button" onClick={() => dispatch(googleSignInStart())} isGoogleSignIn>
                        Sign in with Google
                    </CustumButton>
                </div>
            </form>
        </div>
    )
}

export default SignIn;