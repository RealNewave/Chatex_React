import React, {useEffect, useState} from 'react';
import "./App.scss";
import *  as threadService from "./ThreadService";
import {Answer, getSocket, Question} from "./ThreadService";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {nanoid} from "nanoid";

let username: string = localStorage.getItem("username") || "";

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

function UsernameModal(props: any) {

    const submitUsername = () => {
        if (!inputValue) {
            //show a message
            return
        }
        username = inputValue;
        localStorage.setItem("username", username);
        setInputValue("");
        window.location.reload();
    }
    const [inputValue, setInputValue] = useState("");


    return (
        <div className="username-modal">
            <label>First you need a username!</label>
            <input type="text" value={inputValue} onChange={(event) => setInputValue(event.target.value)}/>
            <button onClick={submitUsername}>Submit</button>
        </div>
    )
}

function Home() {
    return (
        <div className="main-container">
            {!username ? <UsernameModal/> : <MainView/>}
        </div>
    )
}

function MainView() {

    const [questions, setQuestions] = useState([] as Question[]);

    useEffect(() => {
        threadService.closeSocket();
        threadService
            .getQuestions(username)
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

function MessageDetails(props: any) {

    const questionId = document.location.pathname.slice(1);

    const [answers, setAnswers] = useState([] as Answer[]);
    const [answer, setAnswer] = useState("");

    let question: string = "";

    useEffect(() => {
        getAnswers();
        threadService.getSocket(questionId, username).onmessage = (message) => {
            getAnswers()
        }
    }, []);


    const getAnswers = () => {
        threadService
            .getQuestion(username, questionId)
            .then(response => {
                question = response.question;
                setAnswers(response.answers);
            });
    }


    const sendAnswer = () => {
        threadService.answerQuestion(questionId, username, answer);
        setAnswer("");
        getAnswers();
    }

    return (
        <>
            {!username ? <UsernameModal/> :
                <div className="detail-view">
                    <h3 className="subject">{question}</h3>

                    <div className="messages">
                        {answers?.map(answer => <MessageView answer={answer} key={nanoid()}></MessageView>)}
                    </div>
                    <div className="send-message">
                        <input type="text" placeholder="What would you like to say?" value={answer}
                               onChange={(event) => setAnswer(event.target.value)}
                               onKeyDown={event => {
                                   if(event.key === "Enter"){
                                       event.preventDefault();
                                       sendAnswer();
                               }}}

                        />
                        <button type="submit" onClick={sendAnswer}>Send</button>
                    </div>
                </div>
            }
        </>
    )
}

function MessageView(props: any) {

    return (
        <div className="text-bubble">
            <div></div>
            <div className="details-container">
                <div className="sender-details">
                    <div>{props.answer.username}</div>
                    <div>{props.answer.timestamp}</div>
                </div>
                <div className="message">
                    {props.answer.answer}
                </div>
            </div>
        </div>
    )
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
        threadService.createQuestion(username, subject)
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


export default App;
