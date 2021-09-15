import React from 'react';
import Dislike from '../components/Dislike';
import Like from '../components/Like';
export default class Replies extends React.Component {
    state = {
        loading: true,
        replies: null,
        questionId: null
    };
    async componentDidMount() {

      //  const{id} = this.props.match.params;
      console.log(this.props.qid)
        
        var response1 = await fetch(`http://localhost:8082/replies/${this.props.qid}`, {
            method: 'GET'
        });
        var data1 = await response1.json();
        
        this.setState({ replies: data1, loading: false});
        console.log(this.state.replies)
    }

    render() {

        if (this.state.loading) {
            return <div>loading...</div>;
        }
        if(this.state.replies == null) {
            return <div>
            <h6 className="my-3 p-3 bg-body rounded shadow-sm">No replies </h6></div>
        }

        return (
            <div>
                {this.state.replies.map(reply => (

                    <div className="d-flex text-muted pt-3">
                        <svg className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"></rect><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>

                        <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                            <div className="d-flex justify-content-between">

                                <strong className="text-gray-dark">
                                   <h6> {reply.text} </h6>
                                    <div className="pu-"><Like /> {reply.positive}
                                        <Dislike /> {reply.negative} </div>
                                </strong>

                            </div>
                        </div>
                    </div>)
                )}

            </div>
        );
    }
}


