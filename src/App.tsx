import React, {useEffect, useState} from 'react';
import axios from "axios";
import "./App.css";
import {NewThread} from "./new-thread/new-thread";
import {Threads} from "./thread-list/thread-list";
import {Thread} from "./thread-list/Thread";
import {ThreadReply} from "./thread-list/thread-reply";

function App() {
    const [threads, setThreads] = useState<Thread[]>([]);
    const [update, setUpdate] = useState(false);
    useEffect(() => {
        fetchThreads().then(result => setThreads(result))
    }, [update]);

    return (
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <h2 className="navbar-brand">Threading</h2>
                <button className="btn btn-primary">Start Thread</button>
            </div>
        </nav>
        <div className="container-fluid">
            <div className="row">
                <div className="col-3 list-group">
                <a className="list-group-item list-group-item-action active">subject 1</a>
                    <a className="list-group-item list-group-item-action">subject 2 <span className="badge bg-secondary">1</span></a>
            </div>
            <div className="col-7">
                <h3>subject 1</h3>
                <ThreadReply reply={
                    {
                        "sender_id": 1,
                        "message": "hello",
                        "timestamp": "2023-03-07"
                    }}/>
                <ThreadReply reply={
                    {
                        "sender_id": 2,
                        "message": "hi!",
                        "timestamp": "2023-03-07"
                    }}/>
                <ThreadReply reply={
                    {
                        "sender_id": 2,
                        "message": "So you were wondering about subject 1 right? Well let me tell you!",
                        "timestamp": "2023-03-07"
                    }}/>
            </div>
        </div>
        {/*<Threads threads={threads} setUpdate={setUpdate} update={update}/>*/}
        {/*<div className="row col-6">*/}
        {/*    <div className="row d-flex justify-content-end">*/}
        {/*        <NewThread update={update} setUpdate={setUpdate}/>*/}
        {/*    </div>*/}
        {/*</div>*/}
        </div>
</>
)
    ;
}

async function fetchThreads(): Promise<Thread[]> {
    return [
        {sender_id: 1, subject: "subject1", receivers: [], replies: [], timestamp: "06-03-2023"},
        {sender_id: 1, subject: "subject2", receivers: [], replies: [], timestamp: "06-03-2023"},
    ];
    // const response = await axios.get<Thread[]>("http://localhost:8000/threads");
    // return response.data;
}


export default App;
