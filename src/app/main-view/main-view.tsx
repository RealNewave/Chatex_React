import React, {useEffect, useState} from "react";
import * as threadService from "../QuestionService";
import {Question} from "../QuestionService";
import {Link} from "react-router-dom";

import Modal from "react-bootstrap/Modal";
import {LoginModal} from "../home/home";


enum LoginState {
    TRUE, FALSE, UNDEFINED
}


export function MainView() {
    const [status, setStatus] = useState(LoginState.UNDEFINED);
    const [questions, setQuestions] = useState([] as Question[]);
    const [showQuestionModal, setShowQuestionModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        threadService.closeSocket();
        threadService
            .getQuestions()
            .then(questions => {
                setQuestions(questions);
                setStatus(LoginState.TRUE);
            })
            .catch(response => {
                if (response.status === 403) {
                    setStatus(LoginState.FALSE);
                }
            })
    }, []);

    return (
        <>
            <LoginModal show={showLoginModal} setShow={setShowLoginModal}/>
            <button type="button" className="btn btn-primary m-auto" onClick={() => setShowLoginModal(true)}>
                Login
            </button>
            <button type="button" className="btn btn-primary m-auto" onClick={() => setShowQuestionModal(true)}>
                Add Question
            </button>
            <NewQuestion show={showQuestionModal} setShow={setShowQuestionModal}/>
            <div className="container text-center">
                <div className="row">
                    {questions.map(question =>
                        <div className="col-md-4 col-lg-2 mt-3">
                            <SubjectCard question={question} key={question.id}/>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

function SubjectCard(props: any) {
    const question = props.question;

    return (
        <Link style={{textDecoration: "inherit", color: "inherit"}} to={"/" + question.id}>
            <div className="card h-100">
                <img className="card-img-top bg-secondary" src="../../logo.svg">
                    {/*Image placeholder*/}
                </img>
                <div className="card-body">
                    <h5 className="card-title">
                        {question.question}
                    </h5>
                    <div className="card-text">
                        <p className="messages">Answers: {question.answers.length}</p>
                        {/*<div className="usercount">Users: {question.responders.length}</div>*/}
                    </div>
                    <p className="card-subtitle">
                        Started by: <u>{question.starter}</u>
                    </p>
                </div>
            </div>
        </Link>
    )
}

function NewQuestion(props: any) {
    const [subject, setSubject] = useState("");

    const submitForm = () => {
        threadService.createQuestion(subject)
            .then(() => {
                window.location.reload();
            });

    }

    return (
        <Modal show={props.show}>
            <Modal.Header closeButton>
                <Modal.Title>Create a new Question</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label htmlFor="subject" className="form-label">What is this thread about?</label>
                <input id="subject" className="form-control" type="text" value={subject}
                       onChange={(event) => setSubject(event.target.value)}/>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-primary" type="submit" onClick={submitForm}>Create</button>
                <button className="btn btn-secondary" onClick={() => props.setShow(false)}>Close</button>
            </Modal.Footer>

        </Modal>

    )
}