import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";

function App() {
    const [threads, setThreads] = useState<Message[]>([]);
    const [update, setUpdate] = useState(false);
    useEffect(() => {
        axios.get<Message[]>("http://localhost:8000/threads")
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

function ThreadListItem(props: { thread: Message }) {
    const thread = props.thread
    return <li className="card mt-2">
        <div className="card-title d-flex justify-content-between align-items-center mx-3">
            <span>{thread.sender_id}</span> <span className="fw-bold">Some subject</span>
            <span className="badge bg-primary rounded-pill">14</span>
        </div>
        <div className="card-body text-center">{thread.message}</div>
    </li>;
}

function ThreadReply(props: { reply: Message }) {
    return <li className={"card mb-1 w-75"}>
        <div className="card-title d-flex justify-content-between align-items-center mx-3">
            <span>{props.reply.sender_id}</span>
            <span className="fw-bold">{props.reply.message}</span>
        </div>
    </li>;
}

function Threads(props: { threads: Message[], update: boolean, setUpdate: any }) {

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
                    {thread.replies.map((reply: Message, subIndex) => {
                        return <ThreadReply key={`reply_${subIndex}`} reply={reply}/>
                    })
                    }
                    <ReplyToThread key={`reply_${index}`} setUpdate={props.setUpdate} update={props.update} index={index+1}/>
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


type Message = {
    sender_id: number
    message: string
    receivers: []
    replies: []
    timestamp: string
}

function NewThread(props: { update: boolean, setUpdate: any }) {

    const [message, setMessage] = useState("");

    function startNewThread() {
        axios({
            method: "post",
            url: "http://localhost:8000/threads/start",
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
        <div className="col-auto mb-2">
            <input type="text" className="form-text" placeholder={"Choose a subject"} value={message}
                   onChange={handleInput}/>
            <button className="btn btn-primary" onClick={() => {
                startNewThread();
                setMessage("");
                props.setUpdate(!props.update)
            }}>New Thread
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
        <div className="row">
            <div className="col-10 pr-0">
                <textarea className="form-control" id="new-message" rows={1} placeholder={"Type your message"} value={message}
                          onChange={handleInput}></textarea>
            </div>
            <div className="col-2 pl-0">
                <button className="btn btn-primary" id={"send-message"}
                        onClick={() => {
                            replyToThread();
                            setMessage("");
                            props.setUpdate(!props.update)
                        }}>Send
                </button>
            </div>
        </div>
    )
}

export default App;
