import React from 'react';
import Replies from '../components/Replies';

export default class OneQuestion extends React.Component {
    state = {
        loading: true,
        question: null,
        replies: null,
        qid: null
    };
    async componentDidMount() {

        const{id} = this.props.match.params;

        this.setState({qid: id})

        var response = await fetch(`http://localhost:8082/questions/${id}`, {
            method: 'GET'
        });
        var data = await response.json();
        console.log("aaaaaaaaaa")
        console.log(data)
        this.setState({ question: data, loading: false });
        
    }

    render() {

        if (this.state.loading) {
            return <div>loading...</div>;
        }

        if (!this.state.question) {
            return <div>didn't get a question</div>;
        }

        return (
            <div>
                <div className="my-3 p-3 bg-body rounded shadow-sm">
                    <h5 className="border-bottom pb-2 mb-0">{this.state.question.text}</h5>
                    <Replies qid={this.state.qid} />
                </div>
            </div>
        );
    }
}


