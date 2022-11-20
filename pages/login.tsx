import { NextPage } from 'next';
import { useState } from 'react';
import AuthForm from '../components/shared/authForm';
import Container from '../components/shared/container';

const Login: NextPage = () => {
    return (
        <Container>
            <div className="container mx-auto flex flex-grow justify-center">
                <AuthForm authType={'login'} />
            </div>
        </Container>
    );
};

export default Login;
