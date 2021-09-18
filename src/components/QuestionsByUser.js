import { render } from '@testing-library/react';
import React from 'react';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';
import Dislike from './Dislike';
import './Like';
import Like from './Like';
import LikesQ from './LikesQ';

export default class QuestionsByUser extends React.Component {
    state = {
        loading: true,
        questionList: null,
        qid: null
    };
    n = 1;
    async componentDidMount() {
        const{id} = this.props.match.params;
        this.setState({qid: id})

        var response = await fetch(`https://ask-me-golang.herokuapp.com/questions/${id}/1`, {
            method: 'GET'
        });
        var data = await response.json();
        this.setState({ questionList: data });
        this.setState({ loading: false })


    }
    render() {
        
        if (this.state.loading) {
            return <div><h6 className="my-3 p-3 bg-body rounded shadow-sm">loading...</h6></div>;
        }
        if(this.state.questionList == null) {
            return <div>
            <h6 className="my-3 p-3 bg-body rounded shadow-sm">No questions</h6></div>
        }
        return (
            <div>
                {
                    this.state.loading ? <div>loading...</div> :
                        <div>
                            <div className="my-3 p-3 bg-body rounded shadow-sm">
                                <h5 className="border-bottom pb-2 mb-0">Questions</h5>

                                {this.state.questionList.map(question =>
                                    <div className="row text-muted pt-3 border-bottom">
                                    <Link to={"/onequestion/" + question.pk_QuestionId} className="nav-link">
                                        <div className="row ">

                                            <div className="col-md-12 pb-3 mb-0 small lh-sm w-100">
                                                <div className="justify-content-between">

                                                    <strong className="text-gray-dark">
                                                        <svg className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"></rect><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
                                                        <span className="bd-placeholder-img flex-shrink-0 me-2 rounded fs-5">{question.text} </span>

                                                    </strong>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="pu-"><LikesQ fk_QuestionId={question.pk_QuestionId} fk_UserId={this.state.qid}
                                        positive={question.positive} negative={question.negative} /> </div>
                                    <Link to={"/newreply/" + question.pk_QuestionId} className="nav-link">Reply</Link>
                                </div>
                                )}
                            </div>
                        </div>
                }
            </div>
        );
    }
};