import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustumButton from '../custom-button/custom-button.component';

import { signInWithGoogle, auth } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

class SignIn extends React.Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: ''
        };

    }

    handleSubmit = async event => {
        event.preventDefault();

        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({ email: '', password: '' });
        } catch (e) {
            console.error(e);
        }
    };

    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ [name]: value });
    }

    render() {
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput name="email" id="email" type="email"
                        handleChange={this.handleChange}
                        value={this.state.email} 
                        label="Email"
                         />
                    <FormInput name="password" id="password" type="password"
                        value={this.state.password}
                        handleChange={this.handleChange}
                        label="Password"
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
}

export default SignIn;