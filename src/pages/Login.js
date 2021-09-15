import React, { useState } from 'react';
import { Redirect } from 'react-router';
import 'whatwg-fetch';

const Login = () => {    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [user, setUser] = useState({ email, password});

    const handleSubmit = async (e) => {
        e.preventDefault();

        await fetch('http://localhost:8082/user/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            })
        });
        //.then(response => response.json())
        //.then(data=> setUser(data))
                
        //var data = await response.json(); 
      //setUser({email : (e.target[0].value), password: (e.target[1].value)}) 
    //   setEmail({email: 'e.target[0].value'}) 
    //   setPassword({password: 'e.target[1].value'})
        console.log("aaaaaaaaaa")
        console.log(user)

        //setUser(await response.json().data) ne moze  
        //localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('user', user)
        setRedirect(true);    

        
    }
    if(redirect) {
        //return <Redirect to ="/"/>;

        return "this.user.email"
    }
    return (
        <div className="form-signin">
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
        </div>
    );
};

export default Login;