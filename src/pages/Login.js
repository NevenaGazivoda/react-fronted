import React, { useState } from 'react';
import { Redirect } from 'react-router';
import 'whatwg-fetch';

const Login = () => {    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await fetch('/user/login', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        });   
        setRedirect(true);    
    }
    if(redirect) {
        return <Redirect to ="/"/>;
    }
    return (
        <form onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <input type="email" className="form-control" placeholder="name@example.com" required
                onChange={e=> setEmail(e.target.value)}
            />

            <input type="password" className="form-control" placeholder="Password" required 
                onChange={e=> setPassword(e.target.value)}
            />

            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
    );
};

export default Login;