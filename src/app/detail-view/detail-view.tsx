import React, {useEffect, useState} from "react";
import {Answer} from "../QuestionService";
import * as questionService from "../QuestionService";
import {nanoid} from "nanoid";
import {LoginModal} from "../home/home";

let username: string = localStorage.getItem("username") || ""

export function MessageDetails(props: any) {

    const questionId = document.location.pathname.slice(1);

    const [answers, setAnswers] = useState([] as Answer[]);
    const [answer, setAnswer] = useState("");

    let question: string = "";

    useEffect(() => {
        getAnswers();
        questionService.getSocket(questionId, username).onmessage = (message) => {
            getAnswers()
        }
    }, []);


    const getAnswers = () => {
        questionService
            .getQuestion(username, questionId)
            .then(response => {
                question = response.question;
                setAnswers(response.answers);
            });
    }


    const sendAnswer = () => {
        questionService.answerQuestion(questionId, username, answer);
        setAnswer("");
        getAnswers();
    }

    return (
        <>
            {!username ? <LoginModal/> :
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