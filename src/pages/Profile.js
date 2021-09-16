import React from 'react';

export default class UserPage extends React.Component {
    state = {
        loading: true,
        user: null
    };
    async componentDidMount() {

        const { id } = this.props.match.params;


        var response = await fetch(`http://localhost:8082/users/${id}`, {
            method: 'GET'
        });
        var data = await response.json();
        console.log("aaaaaaaaaa")
        console.log(data)
        this.setState({ user: data, loading: false });

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
                </div>
            </div>
        );
    }
}

