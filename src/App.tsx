import React, {useEffect, useState} from 'react';
import "./App.css";
import {Thread} from "./thread-list/Thread";
import {ThreadReply} from "./thread-list/thread-reply";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {regular} from "@fortawesome/fontawesome-svg-core/import.macro";

function App() {

    // const [threads, setThreads] = useState<Thread[]>([]);
    // const [update, setUpdate] = useState(false);
    // useEffect(() => {
    //     fetchThreads().then(result => setThreads(result))
    // }, [update]);

    return (
        <>
            <div className="text-center">
                <div className="row align-items-start">
                    <div className="col-4 border vh-100 ">
                        <div className="vstack gap-1 mb-2 ">
                            <ProfilePreview username="Hans van Os" subtext="Software Engineer" image="profile"/>
                            <div className="border rounded shadow">
                                <ProfilePreview username="Hans van Os" subtext="21 Messages" image="profile"/>
                                <ProfilePreview username="Youssef Airoude" subtext="HO 1 request"
                                                image="threadstarter"/>
                            </div>
                        </div>
                        <div className="container vstack gap-1">
                            <div className="d-flex justify-content-between">
                                <h4>Message <span className="text-primary">(29)</span></h4>
                                <FontAwesomeIcon icon={regular("pen-to-square")}/>
                            </div>
                            <div className="form-group position-relative">
                                <input className="form-control" type="search" placeholder="Search"/>
                                <FontAwesomeIcon icon={regular("compass")}
                                                 className="position-absolute top-50 start-100 pe-5 translate-middle"/>
                            </div>
                            <div className="d-flex justify-content-between mt-2">
                                <span className="text-secondary"><FontAwesomeIcon icon={regular("gem")}
                                                                                  className="me-1"/>PINNED</span>
                                <FontAwesomeIcon icon={regular("square-caret-up")}/>
                            </div>
                            <MessagePreview username="Jasmijn Manenschijn" subtext="Hoi babe, Hoe gaat het?"
                                            image="profile"
                                            time="13:24"/>
                            <MessagePreview username="Rogier Pijpers" subtext="Yo, nog vette dingen gedaan?"
                                            image="profile"
                                            time="15:33"/>
                            <MessagePreview username="Mathijs Janz" subtext="Eyyyyy, nog gamen straks?" image="profile"
                                            time="20:57"/>
                        </div>
                    </div>

                    <div className="col-6 border vh-100">
                        <nav className="navbar navbar-expand-md bg-body-tertiary border-bottom">
                            <div className="container-fluid">
                                <h5 className="navbar-brand">Design chat <span className="text-primary">9</span></h5>
                                <FontAwesomeIcon icon={regular("image")}/>
                                <FontAwesomeIcon icon={regular("envelope")}/>
                                <FontAwesomeIcon icon={regular("comment")}/>
                                <FontAwesomeIcon icon={regular("file")}/>
                                <div className="d-flex">
                                    <div className="bg-primary rounded-circle">HO</div>
                                    <div className="bg-secondary rounded-circle ">YA</div>
                                    <div className="bg-warning rounded-circle ">MJ</div>
                                    <div className="bg-danger rounded-circle ">JM</div>
                                </div>
                            </div>
                        </nav>
                        <div className="vstack height">
                            <MessageReceived username="Mathijs Janz" message="Eyyyyy, nog gamen straks?" image="profile"
                                             time="12:23"/>
                            <MessageSent username="Hans van Os" message="Ja hoor, ik kom er zo aan" image="profile"
                                         time="12:24"/>
                            <div className="form-group d-flex mt-auto">
                                <input type="text" className="form-control" placeholder="Your Message..."/>
                                <button className="btn btn-primary"><FontAwesomeIcon icon={regular("paper-plane")}/>
                                </button>
                            </div>

                        </div>
                    </div>
                    <div className="col-2 border vh-100">Chat Details</div>
                </div>
            </div>
            {/*<div className="container-fluid">*/}
            {/*    <div className="row">*/}
            {/*        <ul className="col-3 list-group">*/}
            {/*            {threads.map((thread, index) =>*/}
            {/*                <li key={index} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">*/}
            {/*                    {thread.subject}*/}
            {/*                    <span className="badge bg-primary rounded-pill">14</span>*/}
            {/*                </li>*/}
            {/*            )}*/}
            {/*        </ul>*/}
            {/*        <div className="col-7">*/}
            {/*            <h3>subject 1</h3>*/}
            {/*            <ThreadReply reply={*/}
            {/*                {*/}
            {/*                    "sender_id": 1,*/}
            {/*                    "message": "hello",*/}
            {/*                    "timestamp": "2023-03-07"*/}
            {/*                }}/>*/}
            {/*            <ThreadReply reply={*/}
            {/*                {*/}
            {/*                    "sender_id": 2,*/}
            {/*                    "message": "hi!",*/}
            {/*                    "timestamp": "2023-03-07"*/}
            {/*                }}/>*/}
            {/*            <ThreadReply reply={*/}
            {/*                {*/}
            {/*                    "sender_id": 2,*/}
            {/*                    "message": "So you were wondering about subject 1 right? Well let me tell you!",*/}
            {/*                    "timestamp": "2023-03-07"*/}
            {/*                }}/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    /!*<Threads threads={threads} setUpdate={setUpdate} update={update}/>*!/*/}
            {/*    /!*<div className="row col-6">*!/*/}
            {/*    /!*    <div className="row d-flex justify-content-end">*!/*/}
            {/*    /!*        <NewThread update={update} setUpdate={setUpdate}/>*!/*/}
            {/*    /!*    </div>*!/*/}
            {/*    /!*</div>*!/*/}
            {/*</div>*/}
        </>
    );
}

function ProfilePreview(props: any) {
    const username = props.username;
    const subtext = props.subtext;
    const image = props.image
    return (
        <>
            <div className="card border-0 border-bottom btn btn-outline-light text-dark">
                <div className="row g-0">
                    <div className="col-md-3 pt-3 ps-3">
                        <img src={require(`./assets/${image}.jpg`)} className="card-img-top rounded-circle h-75"/>
                    </div>
                    <div className="col-md-9">
                        <div className="card-body">
                            <h5 className="card-title">{username}</h5>
                            <p className="card-text"><small className="text-secondary">{subtext}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function MessagePreview(props: any) {
    const username = props.username;
    const subtext = props.subtext;
    const image = props.image;
    const time = props.time;
    return (
        <>
            <button className="card border-0 border-bottom btn btn-outline-light text-dark">
                <div className="row g-0">
                    <div className="col-md-3 pt-3 ps-3">
                        <img src={require(`./assets/${image}.jpg`)} className="card-img-top rounded-circle h-75"/>
                    </div>
                    <div className="col-md-6">
                        <div className="card-body">
                            <p className="card-title">{username}</p>
                            <p className="card-text text-truncate"><small className="text-secondary">{subtext}</small>
                            </p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <p className="card-text mt-3"><small className="text-secondary">{time}</small></p>
                    </div>
                </div>
            </button>
        </>
    )
}

function MessageReceived(props: any) {
    const username = props.username;
    const message = props.message;
    const image = props.image;
    const time = props.time;
    return (
        <>
            <div className="card border-0 text-dark pe-5">
                <div className="row g-0">
                    <div className="col-md-3 pt-3 ps-3">
                        <img src={require(`./assets/${image}.jpg`)} className="card-img-top rounded-circle h-50 w-50"/>
                    </div>
                    <div className="col-md-9">
                        <div className="card-body text-start">
                            <h5 className="card-title">{username} <small className="text-secondary ms-2">{time}</small>
                            </h5>
                            <p className="card-text border rounded-bottom py-2"><small
                                className="ms-1 fs-5">{message}</small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function MessageSent(props: any) {
    const username = props.username;
    const message = props.message;
    const image = props.image;
    const time = props.time;
    return (
        <>
            <div className="card border-0 text-dark ps-5">
                <div className="row g-0">
                    <div className="col-md-9">
                        <div className="card-body text-end">
                            <h5 className="card-title"><small className="text-secondary me-2">{time}</small>{username}
                            </h5>
                            <p className="card-text border rounded-bottom py-2"><small
                                className="me-1 fs-5">{message}</small>
                            </p>
                        </div>
                    </div>
                    <div className="col-md-3 pt-3 ps-3">
                        <img src={require(`./assets/${image}.jpg`)} className="card-img-top rounded-circle h-50 w-50"/>
                    </div>
                </div>
            </div>
        </>
    )
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

    function startThread() {
        setThreads([newThread, ...threads]);
    }

    return (
        <>
            {showForm ?
                <form className="smooth-in navbar-nav" onSubmit={startThread}>

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
            <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                <FontAwesomeIcon icon={regular("square-plus")} className="me-2"/>
                New Thread
            </button>
            <button className="btn btn-secondary" onClick={() => setShowForm(!showForm)}>
                Cancel
            </button>
        </>);
}


export default App;
