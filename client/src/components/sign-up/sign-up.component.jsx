import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signUpStart } from '../../redux/user/user.actions';

import './sign-up.styles.scss';

const SignUp = () => {
    const [userData, setUserData] = useState({ displayName: '', email: '', password: '', confirmPassword: '' });
    const { displayName, email, password, confirmPassword } = userData;
    const dispatch = useDispatch();

    const handleSubmit = async event => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords don\'t match');
            return;
        }

        dispatch(signUpStart({ displayName, email, password }));
        setUserData({ displayName: '', email: '', password: '', confirmPassword: '' });
    }

    const handleChange = event => {
        const { name, value } = event.target;

        setUserData({ ...userData, [name]: value });
    }


    return (
        <div className="sign-up">
            <h2 className="title">I do not have an account</h2>
            <span>Sign up with your email and password</span>

            <form className="sign-up-form" onSubmit={handleSubmit}>
                <FormInput
                    type="text"
                    name="displayName"
                    value={displayName}
                    onChange={handleChange}
                    label='Display Name'
                    required
                />
                <FormInput
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    label='Email'
                    required
                />
                <FormInput
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    label='Password'
                    required
                />
                <FormInput
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                    label='Confirm Password'
                    required
                />
                <CustomButton type="submit">SIGN UP</CustomButton>
            </form>
        </div>
    );
}

export default SignUp;