import { render } from '@testing-library/react';
import React from 'react';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';
import Dislike from './Dislike';
import './Like';
import Like from './Like';

export default class HotQuestions extends React.Component {
    state = {
        loading: true,
        questionList: null,
    };
    async componentDidMount() {

        var response = await fetch('https://ask-me-golang.herokuapp.com/questionsHot', {
            method: 'GET'
        });
        var data = await response.json();
        this.setState({ questionList: data });
        this.setState({ loading: false })
    }
    render() {
        return (
            <div>
                {
                    this.state.loading ? <div>loading...</div> :
                        <div>
                            <div className="my-3 p-3 bg-body rounded shadow-sm">
                                <h6 className="border-bottom pb-2 mb-0">Questions</h6>

                                {this.state.questionList.map(question =>
                                
                                <Link to={"/onequestion/" + question.pk_QuestionId} hash="/#" className="nav-link">

                                        <div className="d-flex text-muted pt-3">
                                            <svg className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"></rect><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>

                                            <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                                                <div className="d-flex justify-content-between">

                                                    <strong className="text-gray-dark">
                                                        {question.text}
                                                        <div>
                                                        {question.reaction_count} <Like/>
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