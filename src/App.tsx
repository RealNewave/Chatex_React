import React, {useEffect, useState} from 'react';
import axios from "axios";
import "./App.css";

function App() {
    const [threads, setThreads] = useState<Thread[]>([]);
    const [update, setUpdate] = useState(false);
    useEffect(() => {
        axios.get<Thread[]>("http://localhost:8000/threads")
            .then(response => {
                setThreads(response.data)
            });
    }, [update]);

    return (
        <div className="container">
            <h2 className="row col-6">
                Chatex
            </h2>
            <div className="row col-6">
                <div className="row d-flex justify-content-end">
                    <NewThread update={update} setUpdate={setUpdate}/>
                </div>
                <div className="row mb-2">
                    <div className="col-12">
                        <Threads threads={threads} setUpdate={setUpdate} update={update}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Threads(props: { threads: Thread[], update: boolean, setUpdate: any }) {

    const [selected, setSelected] = useState<Map<number, boolean>>(new Map());

    function handleSelected(index: number) {
        let stateMap = selected;
        const currentState = stateMap.get(index);
        stateMap = new Map<number, boolean>();
        stateMap.set(index, !currentState);
        setSelected(stateMap);
    }

    function isHidden(index: number) {
        return selected.get(index) ? "d-block" : "d-none";
    }

    const result = props.threads.map((thread, index) => {
        return (
            <div>
                <span onClick={() => {
                    handleSelected(index)
                }}>
                    <ThreadListItem key={`thread_${index}`} thread={thread}/>
                </span>
                <span className={isHidden(index)}>
                    <div className="timeline">
                        <ul>
                            {thread.replies.map((reply: Message, subIndex) => {
                                return <li>
                                    <ThreadReply key={`reply_${subIndex}`} reply={reply}/>
                                </li>
                            })}
                            <ReplyToThread key={`reply_${index}`} setUpdate={props.setUpdate} update={props.update}
                                           index={index + 1}/>
                        </ul>
                    </div>
                </span>
            </div>
        )
    });
    return (
        <ul className="list-group">
            {result}
        </ul>
    )
}

function ThreadListItem(props: { thread: Thread }) {
    const thread = props.thread
    return <li className="card mt-1">
        <div className="card-title d-flex justify-content-between align-items-center mx-3 my-1">
            <img src={require("./threadstarter.jpg")} className="img rounded" style={{maxHeight: 5 + "em"}}/>
            <span className="fw-bold">{thread.subject}</span>
            <span className="badge bg-primary rounded-pill">2</span>
        </div>
        {/*<div className="card-body text-center">{thread.subject}</div>*/}
    </li>;
}

function ThreadReply(props: { reply: Message }) {

    const timestamp = new Date(props.reply.timestamp).toUTCString();
    return <>
        <div className="row">
            <div className="col-1 bullet green"/>
            <div className="col-11 time">{timestamp}</div>
        </div>
        <div className={"card my-2 ms-5 info"}>
            <div className="row">
                <div className="col-2 mt-1 mb-auto ms-2">
                    <img src={require("./profile.jpg")} className="img rounded" style={{maxHeight: 5 + "em"}}/>
                </div>
                <div className="col-9">
                    <div className="card-body ms-0 vstack">
                        <div className="card-title fw-semibold">Hans van Os</div>
                        <div className="card-text">{props.reply.message}</div>
                    </div>
                </div>
            </div>
        </div>
    </>;
}

function NewThread(props: { update: boolean, setUpdate: any }) {

    const [subject, setSubject] = useState("");

    function startNewThread() {
        axios({
            method: "post",
            url: "http://localhost:8000/threads/start",
            data: {
                "sender_id": 1,
                "subject": subject
            }
        });
    }

    function handleInput(event: any) {
        setSubject(event.target.value);
    }

    return (
        <div className="col mb-2 hstack gap-4">
            <input type="text" className="form-control" placeholder={"What is the next chat about?"} value={subject}
                   onChange={handleInput}/>
            <button className="btn btn-primary" onClick={() => {
                startNewThread();
                setSubject("");
                props.setUpdate(!props.update)
            }}>Create
            </button>
        </div>
    )
}

function ReplyToThread(props: { update: boolean, setUpdate: any, index: number }) {

    const [message, setMessage] = useState("");

    function replyToThread() {

        axios({
            method: "post",
            url: "http://localhost:8000/threads/reply/" + props.index,
            data: {
                "sender_id": 1,
                "message": message
            }
        });
    }

    function handleInput(event: any) {
        setMessage(event.target.value);
    }

    return (
        <li>

            <div className="row mt-4">
                <div className="col-1 bullet green"/>
                <div className="col-11 pr-0">
                    <div className="hstack gap-2">
                        <div className="col-10 ms-3 ps-1">
                            <textarea className="form-control" id="new-message" rows={1} wrap={"hard"}
                                      placeholder={"Type your message"}
                                      value={message}
                                      style={{resize: "none"}}
                                      onChange={handleInput}/>
                        </div>
                        <div className="col-2 ps-4">
                            <button className="btn btn-primary" id={"send-message"}
                                    onClick={() => {
                                        replyToThread();
                                        setMessage("");
                                        props.setUpdate(!props.update)
                                    }}>Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}

type Thread =
    {
        sender_id: number
        subject: string
        receivers: []
        replies: []
        timestamp: string
    }

type Message =
    {
        sender_id: number
        message: string
        timestamp: string
    }

export default App;
