import React, {useEffect, useState} from 'react';
import "./App.css";
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
            <nav className="navbar navbar-expand-md bg-body-tertiary">
                <div className="container-fluid">
                    <h2 className="navbar-brand">Threading</h2>
                    <StartThread threads={threads} setThreads={setThreads}></StartThread>
                </div>
            </nav>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3 list-group">
                        {threads.map((thread, index) =>
                            <a key={index} className="list-group-item list-group-item-action">{thread.subject}</a>
                        )}
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
    );
}

async function fetchThreads(): Promise<Thread[]> {
    return [
        {sender_id: 1, subject: "subject1", receivers: [], replies: [], timestamp: "06-03-2023"},
        {sender_id: 1, subject: "subject2", receivers: [], replies: [], timestamp: "06-03-2023"},
    ];
    // const response = await axios.get<Thread[]>("http://localhost:8000/threads");
    // return response.data;
}


function StartThread({threads, setThreads}: any) {

    const [showForm, setShowForm] = useState(false);
    const [newThread, setNewThread] = useState({
        subject: "",
        receivers: [],
        timestamp: "08-03-2023",
        replies: [],
        sender_id: 1
    } as Thread)
    let buttonText = showForm ? "Cancel" : "Start Thread";

    function startThread() {
        setThreads([newThread, ...threads]);
    }

    return (
        <>

            {showForm ?
                <form className="smoothin navbar-nav" onSubmit={startThread}>

                    <input type="text" className="nav-item form-control" placeholder="Subject"
                           onChange={(event) => {
                               newThread.subject = event.target.value;
                               setNewThread(newThread);
                           }}/>
                    <input type="text" className="nav-item form-control" placeholder="Receivers"
                           onChange={(event) => {
                               newThread.receivers = [event.target.value]
                               setNewThread(newThread);
                           }}/>

                    <button className="btn btn-primary" onClick={startThread}>Submit</button>
                </form> : <></>
            }
            <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>{buttonText}</button>
        </>);
}


export default App;
