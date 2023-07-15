import React, {useEffect, useState} from "react";
import {Question} from "../QuestionService";
import * as threadService from "../QuestionService";
import {Link} from "react-router-dom";


export function MainView() {

    const [questions, setQuestions] = useState([] as Question[]);
    useEffect(() => {
        threadService.closeSocket();
        threadService
            .getQuestions()
            .then(questions => setQuestions(questions));
    }, []);

    return (
        <div className="content-overview">
            <NewQuestion/>
            {questions.map(question =>
                <SubjectCard question={question} key={question.id}/>
            )}
        </div>
    );
}

function SubjectCard(props: any) {
    const question = props.question;

    return (
        <Link style={{textDecoration: "inherit", color: "inherit"}} to={"/" + question.id}>
            <div className="v-card clickable">
                <div className="header">
                    {/*Image placeholder*/}
                </div>
                <div className="title">
                    {question.question}
                </div>
                <div className="content">
                    <div className="messages">Answers: {question.answers.length}</div>
                    {/*<div className="usercount">Users: {question.responders.length}</div>*/}
                </div>
                <p className="subtext">
                    Started by: <u>{question.starter}</u>
                </p>
            </div>
        </Link>
    )
}

function NewQuestion() {
    const [showButton, setShowButton] = useState(true);
    const [subject, setSubject] = useState("");

    const showForm = () => {
        setShowButton(!showButton);
    }

    const submitForm = () => {
        threadService.createQuestion(subject)
            .then(() => {
                setSubject("");
                showForm();
                window.location.reload();
            });

    }

    return (
        <div className="v-card">
            {
                showButton &&
                <button className="new-thread clickable" onClick={showForm}>+</button>
            }
            {
                !showButton &&
                <>
                    <div className="title">
                        <form>
                            <input type="text" placeholder="What is this thread about?" value={subject}
                                   onChange={(event) => setSubject(event.target.value)}/>
                        </form>
                    </div>
                    <div className="content">
                        <button type="submit" onClick={submitForm}>Create</button>
                    </div>
                </>
            }
        </div>
    )
}