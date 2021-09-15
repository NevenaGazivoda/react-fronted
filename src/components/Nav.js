import React from 'react';
import { Link } from 'react-router-dom';

export default class Nav extends React.Component  {
    state={
        logedUser: null,
        logged: false
    };
    async componentDidMount() {
        var data1 = await localStorage.getItem("user");
        if(data1 === null)
        {
            data1 = await localStorage.getItem("user");
        }
        if(data1 === null)
        {
            data1 = await localStorage.getItem("user");
        }
        await this.setState({ logedUser: data1 })
        
        if (this.state.logedUser !== null) {
            if (this.state.logedUser.pk_UserId !== "") {
                this.setState({ logged: true })
            }
        }
    }
render(){
    if(this.state.logged)
    {
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand" >Home</Link>
                <Link to="/newquestion" className="navbar-brand" >New question</Link>
                <Link to='/questionsbyuser/${this.state.logedUser.pk_UserId}' className="navbar-brand" >My question</Link>
                <div>
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item">
                            <Link to="/register" className="nav-link">Logout</Link>
                        </li>
                        
                    </ul>

                </div>
            </div>
        </nav>
        );
    }
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <div className="navbar-brand"></div>
                <div>
                    <ul className="navbar-nav me-auto mb-2 mb-md-0 pull-right">
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/register" className="nav-link">Register</Link>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    );
}
};
