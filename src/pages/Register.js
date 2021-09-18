import React, { useState } from 'react';
import { Redirect } from 'react-router';
import 'whatwg-fetch';

const Register = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await fetch('https://ask-me-golang.herokuapp.com/users', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                name,
                surname,
                email,
                password
            })
        });
       
        setRedirect(true);
    }

    if(redirect) {
        return <Redirect to ="/login"/>;
    }
    
    return (
        <div className="form-signin">
        <form onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 fw-normal">Please register</h1>
            
            <input className="form-control" placeholder="Name" required
                onChange={e => setName(e.target.value)}
            />

            <input className="form-control" placeholder="Surname" required
                onChange={e => setSurname(e.target.value)}
            />

            <input type="email" className="form-control" placeholder="name@example.com" required
                onChange={e => setEmail(e.target.value)}
            />

            <input type="password" className="form-control" placeholder="Password" required 
                onChange={e => setPassword(e.target.value)}
            />

            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        </form>
        </div>
    );
};

export default Register;