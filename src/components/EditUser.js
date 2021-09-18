import React from 'react';
import 'whatwg-fetch';
import { Redirect } from 'react-router';

export default class EditUser extends React.Component {
    constructor(props) {
      super(props);
      this.state = {name: '',
      surname: '',
      email: '',
      redirect: false,
      user: null,
      pk_UserId: null,
      logedUser: null
      }      
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      
    }
    async componentDidMount() {

        const{pk_UserId} = this.props.match.params;

        var response = await fetch(`https://ask-me-golang.herokuapp.com/users/${pk_UserId}`, {
            method: 'GET'
        });
        var data = await response.json();
        this.setState({ user: data, loading: false });     
        this.setState({name: this.state.user.name})
        this.setState({surname: this.state.user.surname})
        this.setState({email: this.state.user.email})
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

      const name = this.state.name;
      const surname = this.state.surname;
      const email = this.state.email;
      const {pk_UserId} = this.props.match.params;

      var response = await fetch('https://ask-me-golang.herokuapp.com/usersEdit', {
        method: 'POST',
        body: JSON.stringify({
            name,
            surname,
            email,
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
                  <h1 className="h3 mb-3 fw-normal">Edit Profile</h1>
                  Name: <input className="form-control" name="name" placeholder="Name" required
                      text={this.state.name} onChange={this.handleChange} value={this.state.name}
                  />
                  Surname: <input className="form-control" name="surname" placeholder="Surname" required
                      surname={this.state.surname} onChange={this.handleChange} value={this.state.surname}
                  />
                 
                  Email: <input type="email" className="form-control" name="email" placeholder="name@example.com" required
                  email={this.state.email} onChange={this.handleChange} value={this.state.email}
                   />
                   <button className="w-100 btn btn-lg btn-primary" type="submit">Edit</button>
              </form>
          </div>
        
      );
    }
  }