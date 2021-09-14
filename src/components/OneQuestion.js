import React from 'react';

export default class OneQuestion extends React.Component {
    state = {
        loading: true,
        question: null
    };
    async componentDidMount() {
        const{id} = this.props.match.params;

        var response = await fetch(`http://localhost:8082/questions/${id}`, {
            method: 'GET'
        });
        var data = await response.json();
        console.log(data)
        this.setState({ question: data, loading: false });

    }

    render() {
        if (this.state.loading) {
            return <div>loading...</div>;
        }

        if (!this.state.question) {
            return <div>didn't get a person</div>;
        }

        return (
            <div>
                <div>{this.state.question.text}</div>

            </div>
        );
    }
}

