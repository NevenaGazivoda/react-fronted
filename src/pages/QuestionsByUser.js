import { render } from '@testing-library/react';
import React from 'react';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';
import Dislike from '../components/Dislike';
import '../components/Like';
import Like from '../components/Like';

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

        var response = await fetch(`http://localhost:8082/questions/1/` + this.n, {
            method: 'GET'
        });
        var data = await response.json();
        console.log(data)
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
                                <h5 className="border-bottom pb-2 mb-0">Questions</h5>

                                {this.state.questionList.map(question =>
                                    <Link to={"/onequestion/" + question.pk_QuestionId} className="nav-link">

                                        <div className="d-flex text-muted pt-3">
                                            <svg className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"></rect><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>

                                            <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                                                <div className="d-flex justify-content-between">

                                                    <strong className="text-gray-dark">
                                                        {question.text}
                                                        <div className="pu-"><Like /> {question.positive}
                                                            <Dislike /> {question.negative} </div>
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