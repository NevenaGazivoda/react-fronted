import { render } from '@testing-library/react';
import React from 'react';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';
import Dislike from './Dislike';
import './Like';
import Like from './Like';

export default class HotUsers extends React.Component {
    state = {
        loading: true,
        usersList: null,
    };
    async componentDidMount() {

        var response = await fetch('https://ask-me-golang.herokuapp.com/users/hot', {
            method: 'GET'
        });
        var data = await response.json();
        this.setState({ usersList: data });
        this.setState({ loading: false })
    }
    render() {
        return (
            <div>
                {
                    this.state.loading ? <div>loading...</div> :
                        <div>
                            <div className="my-3 p-3 bg-body rounded shadow-sm">
                                <h6 className="border-bottom pb-2 mb-0">Users</h6>

                                {this.state.usersList.map(user =>

                                    <Link to={"/questionsbyuser/" + user.pk_UserId} className="nav-link">

                                <div className="d-flex text-muted pt-3">
                                    <svg className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"></rect><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>

                                    <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                                        <div className="d-flex justify-content-between">

                                            <strong className="text-gray-dark">
                                                    {user.name} {user.surname}
                                                    <div>
                                                        {user.comment_count} comments
                                                        </div>
                                            </strong>
                                        </div>
                                    </div>
                                </div>
                                    </Link>
                                )}
                            </div>
                        </div>
                }
            </div>
        );
    }
};