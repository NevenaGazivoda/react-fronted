import React from 'react';
import { Link } from 'react-router-dom';

export default class UserPage extends React.Component {
    state = {
        loading: true,
        user: null,
        logedUser: null,
        logged: false
    };
    async componentDidMount() {

        const { id } = this.props.match.params;


        var response = await fetch(`https://ask-me-golang.herokuapp.com/users/${id}`, {
            method: 'GET'
        });
        var data = await response.json();
        this.setState({ user: data, loading: false });

        if(this.state.user.pk_UserId !== "")
        {      
          localStorage.setItem("user", JSON.stringify(this.state.user))
        this.setState( {redirect : true} )     
        }
        else{
          this.setState({ redirect : false });
        }

    }

    render() {

        if (this.state.loading) {
            return <div>loading...</div>;
        }

        if (!this.state.user) {
            return <div>didn't get a user</div>;
        }

        return (
            <div>
                <div className="my-3 p-3 bg-body rounded shadow-sm">
                    <h5 className="border-bottom pb-2 mb-0">User profile</h5>
                    <ul>
                        <li>
                            <div className="d-flex text-muted pt-3">
                                <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                                    <div className="d-flex justify-content-between">
                                        <strong className="text-gray-dark">
                                            Name: {this.state.user.name}
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex text-muted pt-3">
                                <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                                    <div className="d-flex justify-content-between">
                                        <strong className="text-gray-dark">
                                            Surname: {this.state.user.surname}
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex text-muted pt-3">
                                <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                                    <div className="d-flex justify-content-between">
                                        <strong className="text-gray-dark">
                                            Email: {this.state.user.email}
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div className="d-flex text-muted pt-3">
                                <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                                    <div className="d-flex justify-content-between">
                                        <strong className="text-gray-dark">                                       
                                        <Link to= {"/edituser/" + this.state.user.pk_UserId} >Change your profile </Link>
                                        </strong>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex text-muted pt-3">
                                <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                                    <div className="d-flex justify-content-between">
                                        <strong className="text-gray-dark">
                                        <Link to= {"/editpassword/" + this.state.user.pk_UserId} >Change your password </Link>
                                        </strong>
                                    </div>
                                </div>
                            </div>
                </div>
            </div>
        );
    }
}

