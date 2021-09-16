import React from 'react';
import 'whatwg-fetch';
import { Redirect } from 'react-router';

export default class EditQuestion extends React.Component {
    constructor(props) {
      super(props);
      this.state = {text: '',
      pk_QuestionId: '',
      redirect: false,
      logedUser: null,
      question: null
      }      
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      
    }
    async componentDidMount() {

        const{pk_QuestionId} = this.props.match.params;


        var response = await fetch(`http://localhost:8082/questions/${pk_QuestionId}`, {
            method: 'GET'
        });
        var data = await response.json();
        console.log("aaaaaaaaaa")
        console.log(data)
        this.setState({ question: data, loading: false });
        console.log(this.state.question)
        this.setState({text: this.state.question.text})
        console.log(this.state.text)
        
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
      const {pk_QuestionId} = this.props.match.params;

      console.log(text)
      console.log(pk_QuestionId)

      var response = await fetch('http://localhost:8082/questionsEdit', {
        method: 'POST',
        body: JSON.stringify({
            text,
            pk_QuestionId
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
            <h1 className="h3 mb-3 fw-normal">Edit question</h1>
            
            <textarea className="form-control mb-3" name="text" placeholder="Text" required
                text={this.state.text} onChange={this.handleChange} value={this.state.text}
            />

            <button className="w-100 btn btn-lg btn-primary" type="submit">Edit</button>
        </form>
        </div>
        
      );
    }
  }