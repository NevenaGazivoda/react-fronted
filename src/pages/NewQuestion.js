import React, { useState } from 'react';
import { Redirect } from 'react-router';
import 'whatwg-fetch';

const NewQuestion = () => {
    const [text, setText] = useState('');
    const [fk_UserId, setUserId] = useState(1);
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await fetch('http://localhost:8082/questions', {
            method: 'POST',
            body: JSON.stringify({
                text,
                fk_UserId
            })
        });
       
        setRedirect(true);
    }

    if(redirect) {
       // return <Redirect to ="/login"/>;
    }
    
    return (
        <div className="form-signin">
        <form onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 fw-normal">Add new question</h1>
            
            <textarea className="form-control mb-3" placeholder="Text" required
                onChange={e => setText(e.target.value)}
            />

            <button className="w-100 btn btn-lg btn-primary" type="submit">Add</button>
        </form>
        </div>
    );
};

export default NewQuestion;