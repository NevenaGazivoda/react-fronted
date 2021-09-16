import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Logout extends Component {
   
    logout = () => {
        window.localStorage.clear();
        window.location.href = "/login";
    }
    render(){
        return(
            <Link onClick={this.logout} className="navbar-brand">Logout</Link>
        )
    }
}