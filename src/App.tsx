import React, {useEffect, useState} from 'react';
import "./App.scss";
import *  as threadService from "./ThreadService";
import {Answer, Question} from "./ThreadService";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/:questionId" element={<MessageDetails/>}/>
            </Routes>
        </BrowserRouter>
    );
}

function Home() {
    return (
        <div className="main-container">
            <MainView/>
        </div>
    )
}

function MessageDetails(props: any) {

    const questionId = document.location.pathname.slice(1);

    const [answers, setAnswers] = useState([] as Answer[]);
    const [answer, setAnswer] = useState("");

    let question: string = "";

    useEffect(() => {
        getAnswers();
    }, []);

    const getAnswers = () => {
        threadService
            .getQuestion(+questionId)
            .then(response => {
                question = response.question;
                setAnswers(response.answers);
            });
    }


    const sendAnswer = () => {
        threadService.answerQuestion(+questionId, answer)
            .then(() => {
                getAnswers();
                setAnswer("");
            })
    }

    return (
        <div className="detail-view">
            <h3 className="subject">{question}</h3>

            <div className="messages">
                {answers.map(answer => <MessageView answer={answer} key={answer.id}></MessageView>)}
            </div>
            <div className="send-message">
                <input type="text" placeholder="What would you like to say?" value={answer}
                       onChange={(event) => setAnswer(event.target.value)}/>
                <button onClick={sendAnswer}>Send</button>
            </div>
        </div>
    )
}

export function SubjectListCard(props: any) {
    const subject: string = props.subject;
    const usernames: string[] = props.usernames;
    const time = props.time;
    const splitNames = usernames.map(name => name.split(" "));

    function showChatDetails() {

    }

    return (
        <div className="h-card active" onClick={showChatDetails}>
            <div className="flex-column center">
                <p>{subject}</p>
                <small>
                    {splitNames.map(splitName => {
                        const firstName = splitName[0][0];
                        let lastName = "";
                        if (splitName.length > 1) {
                            lastName = splitName[splitName.length - 1][0]
                        }
                        return firstName + lastName;
                    }).join(", ")
                    }
                </small>
            </div>
            <p className="right"><small className="text-secondary">{time}</small></p>
        </div>
    )
}

function MessageView(props: any) {

    return (
        <div className="text-bubble">
            <div></div>
            <div className="details-container">
                <div className="sender-details">
                    <div>{props.answer.username}</div>
                    <div>{props.answer.time}</div>
                </div>
                <div className="message">
                    {props.answer.answer}
                </div>
            </div>
        </div>
    )
}

function MainView() {

    const [questions, setQuestions] = useState([] as Question[]);

    useEffect(() => {
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

    const starter: string = "Hans van Os";

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


export default App;
