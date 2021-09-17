import { render } from '@testing-library/react';
import React from 'react';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';
import Dislike from '../components/Dislike';
import '../components/Like';
import Like from '../components/Like';
import HotQuestions from '../components/HotQuestions';
import HotUsers from '../components/HotUsers';
import { Redirect } from 'react-router';
import LikesQ from '../components/LikesQ';

export default class Home extends React.Component {
    state = {
        loading: true,
        questionList: null,
        logedUser: null,
        redirect: false,
        user: null
    };
    pageNumber = 1;
    async componentDidMount() {
        var data1 = await localStorage.getItem("user");
        if (data1 === null) {
            data1 = await localStorage.getItem("user");
        }
        await this.setState({ logedUser: data1 })

        if (this.state.logedUser === null) {
            this.setState({ redirect: true })
        } else {
            if (this.state.logedUser.pk_UserId === "") {
                this.setState({ redirect: true })
            }
            else {

                this.setState({ user: JSON.parse(this.state.logedUser) })
                var response = await fetch('http://localhost:8082/questions/paging/' + this.pageNumber, {
                    method: 'GET'
                });
                var data = await response.json();
                this.setState({ questionList: data });
                this.setState({ loading: false })

            }
        }
    }
    render() {

        if (this.state.redirect) {
            return <Redirect to="/login" />;
        }
        return (

            <div>
                {
                    this.state.loading ? <div>loading...</div> :
                        <div className="row">
                            <div className="col-md-3">
                                <HotQuestions />
                                <HotUsers />
                            </div>
                            <div className="col-md-9 my-3 p-3 bg-body rounded shadow-sm">
                                <h3 className="border-bottom pb-2 mb-0">Questions</h3>

                                {this.state.questionList.map(question =>

                                    <div className="row text-muted pt-3 border-bottom">
                                        <Link to={"/onequestion/" + question.pk_QuestionId} className="nav-link">
                                            <div className="row ">

                                                <div className="col-md-12 pb-3 mb-0 small lh-sm w-100">
                                                    <div className="justify-content-between">

                                                        <strong className="text-gray-dark">
                                                            <svg className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"></rect><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
                                                            <span className="bd-placeholder-img flex-shrink-0 me-2 rounded fs-5">{question.text} </span>



                                                            {/* {question.fk_UserId === this.state.user.pk_UserId
                                                                 ?   <Link to={"/editquestion/" + question.pk_QuestionId} className="nav-link">Edit</Link>
                                                                 : <i></i> 
                                                            } */}

                                                        </strong>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                        <div className="pu-"><LikesQ fk_QuestionId={question.pk_QuestionId} fk_UserId={this.state.user.pk_UserId}
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