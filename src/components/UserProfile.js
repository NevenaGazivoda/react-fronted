import React from 'react';

export default class UserProfile extends React.Component  {
    state ={
        full_name : ""

    }
  
    getName = function() {
      return this.state.full_name;    // Or pull this from cookie/localStorage
    };
  
    setName = function(name) {
      this.setState({full_name: name})     
    };
  
    render()
    {
    return {
    }
}
  }
  