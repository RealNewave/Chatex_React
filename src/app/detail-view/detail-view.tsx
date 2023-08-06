import React, {useEffect, useState} from "react";
import {Answer} from "../QuestionService";
import * as questionService from "../QuestionService";
import {nanoid} from "nanoid";
import {LoginModal} from "../home/home";

let username: string = localStorage.getItem("username") || "";

export function MessageDetails(props: any) {

    const questionId = document.location.pathname.slice(1);


    const [answers, setAnswers] = useState([] as Answer[]);
    const [answer, setAnswer] = useState("");
    const [question, setQuestion] = useState("");

    useEffect(() => {
        getAnswers();
        questionService.getSocket(questionId).onmessage = (message) => {
            getAnswers()
        }
    }, []);


    const getAnswers = () => {
        questionService
            .getQuestion(questionId)
            .then(response => {
                setQuestion(response.question);
                setAnswers(response.answers);
            });
    }


    const sendAnswer = () => {
        questionService.answerQuestion(questionId, answer);
        setAnswer("");
        getAnswers();
    }

    return (
        <>
            {!username ? <LoginModal show={true}/> :
                <div className="container vh-100 border border-primary">
                    <h3 className="display-3">{question}</h3>
                    <div className="row">
                        {answers?.map(answer => <div className="col-12 my-2" key={nanoid()}><MessageView answer={answer} />
                        </div>)}
                    </div>
                    <div className="row my-2">
                        <div className="col-9 pe-0">
                            <input type="text" className="form-control" placeholder="What would you like to say?"
                               value={answer}
                               onChange={(event) => setAnswer(event.target.value)}
                               onKeyDown={event => {
                                   if (event.key === "Enter") {
                                       event.preventDefault();
                                       sendAnswer();
                                   }
                               }}
                            />
                        </div>
                        <div className="col-3 ps-1">
                        <button className="btn btn-primary w-100 " type="submit" onClick={sendAnswer}>Send</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

function MessageView(props: any) {

    return (
        <div className="card border border-success">
            <div className="card-body">
                <div className="card-text">
                    {props.answer.answer}
                </div>
            </div>
            <small
                className="card-footer text-body-secondary">{props.answer.username} | {props.answer.timestamp}</small>
        </div>
    )
}