import React from 'react';
import 'whatwg-fetch';
import { Redirect } from 'react-router';

export default class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {email: '',
      password: '',
      redirect: false,
      user: null}
      
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
      //this.setState({email: event.target.value}, {password: event.target.value},{user: event.target.value});
    }
  
    async handleSubmit(event) {
      event.preventDefault();
      const email = this.state.email;
      const password = this.state.password;
       var response= await fetch('http://localhost:8082/user/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            })
        });

        var data = await response.json(); 
        this.setState({ user: data, redirect : true });


        if(this.state.user.pk_UserId !== "")
        {
         this.setState( {redirect : true} ) 
        localStorage.setItem("user", JSON.stringify(this.state.user))
        }
        else{
          this.setState({ redirect : false });
        }
    }
    
    render() {
        if(this.state.redirect) 
        {
            return <Redirect to ="/"/>;    
        }
        
      return (
        <div className="form-signin">
        <form onSubmit={this.handleSubmit}>
             <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <input type="email" name="email" className="form-control" placeholder="name@example.com" 
                email={this.state.email} onChange={this.handleChange}
            />

            <input type="password" name="password" className="form-control" placeholder="Password" required 
                password={this.state.password} onChange={this.handleChange}             
            />
          
          <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
        </div>
      );
    }
  }