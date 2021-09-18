import React from 'react';
import 'whatwg-fetch';
import { Redirect } from 'react-router';

export default class EditReply extends React.Component {
    constructor(props) {
      super(props);
      this.state = {text: '',
      pk_ReplyId: '',
      redirect: false,
      logedUser: null,
      reply: null
      }      
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      
    }
    async componentDidMount() {

        const{pk_ReplyId} = this.props.match.params;


        var response = await fetch(`https://ask-me-golang.herokuapp.com/reply/${pk_ReplyId}`, {
            method: 'GET'
        });
        var data = await response.json();
        this.setState({ reply: data, loading: false });
        this.setState({text: this.state.reply.text})
        
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
      const {pk_ReplyId} = this.props.match.params;


      var response = await fetch('https://ask-me-golang.herokuapp.com/repliesEdit', {
        method: 'POST',
        body: JSON.stringify({
            text,
            pk_ReplyId
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
            <h1 className="h3 mb-3 fw-normal">Edit reply</h1>
            
            <textarea className="form-control mb-3" name="text" placeholder="Text" required
                text={this.state.text} onChange={this.handleChange} value={this.state.text}
            />

            <button className="w-100 btn btn-lg btn-primary" type="submit">Edit</button>
        </form>
        </div>
        
      );
    }
  }