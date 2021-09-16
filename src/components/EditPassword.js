import React from 'react';
import 'whatwg-fetch';
import { Redirect } from 'react-router';

export default class EditPassword extends React.Component {
    constructor(props) {
      super(props);
      this.state = {password: '',
      pk_UserId: '',
      redirect: false,
      logedUser: null,
      question: null
      }      
  
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
    }

    async handleSubmit(event) {
      event.preventDefault();

      const password = this.state.password;
      const {pk_UserId} = this.props.match.params;

      var response = await fetch('http://localhost:8082/usersPassword', {
        method: 'POST',
        body: JSON.stringify({
            password,
            pk_UserId
        })
    });
        this.setState({redirect:true})
   
    }
    
    render() {
        if(this.state.redirect) {
            return <Redirect to ="/"/>;
         }
      return (
        <div className="form-signin">
        <form onSubmit={this.handleSubmit}>
            <h1 className="h3 mb-3 fw-normal">New password</h1>
            
            <input type="password" className="form-control mb-3" name="text" placeholder="Password" required
                text={this.state.password} onChange={this.handleChange} 
            />

            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        </form>
        </div>
        
      );
    }
  }