import React from 'react';
import 'whatwg-fetch';
import { Redirect } from 'react-router';

export default class NewReply extends React.Component {
    constructor(props) {
      super(props);
      this.state = {text: '',
      fk_UserId: '',
      fk_QuestionId: '',
      redirect: false,
      logedUser: null,
      qid: null
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
      const text = this.state.text;

      const{id} = this.props.match.params;

        this.setState({qid: id})

      
      var data1 = await localStorage.getItem("user");
      if(data1 === null)
      {
        data1 = await localStorage.getItem("user");
      }
      await this.setState({ logedUser: JSON.parse(data1) })
      
      const fk_UserId = this.state.logedUser.pk_UserId;
      const fk_QuestionId = this.state.qid;

      var response = await fetch('https://ask-me-golang.herokuapp.com/replies', {
            method: 'POST',
            body: JSON.stringify({
                text,
                fk_UserId,
                fk_QuestionId
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
            <h1 className="h3 mb-3 fw-normal">Add new reply</h1>
            
            <textarea className="form-control mb-3" name="text" placeholder="Text" required
                text={this.state.text} onChange={this.handleChange}
            />

            <button className="w-100 btn btn-lg btn-primary" type="submit">Add</button>
        </form>
        </div>
        
      );
    }
  }