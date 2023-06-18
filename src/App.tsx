import React, {useEffect, useState} from 'react';
import "./App.scss";
import *  as threadService from "./ThreadService";
import {Message, Thread} from "./ThreadService";
import {BrowserRouter, Link, NavLink, Route, Router, Routes} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/:threadId" element={<MessageDetails/>}/>
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

    const subject = props.subject;

    const [messages, setMessages] = useState([] as Message[]);

    useEffect(() => {
        threadService
            .getMessages(props.threadId)
            .then(messages => setMessages(messages));
    });


    return (
        <div className="detail-view">
            <h3 className="subject">{subject || "Games!"}</h3>

            <div className="messages">
                {messages.map(message =>
                    <MessageView username={message.userId} message={message.body}
                                 time="11:27"></MessageView>
                )}
            </div>
            {/*<MessageView username="Hans van Os" message="Yo!" time="22:51"></MessageView>*/}
            {/*<MessageView username="Youssef Airoude" message="Waddup?" time="22:51"></MessageView>*/}
            {/*<MessageView username="Mathijs Janz" message="Ewa" time="22:51"></MessageView>*/}
            {/*<MessageView username="Hans van Os" message="Klaar voor de ps5 gaming?" time="22:51"></MessageView>*/}

            <input type="text" className="send-message" placeholder="What would you like to say?"/>
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
    const username: string = props.username;
    const message: string = props.message;
    const time = props.time;
    return (
        <div className="text-bubble">
            <div></div>
            <div className="details-container">
                <div className="sender-details">
                    <div>{username}</div>
                    <div>{time}</div>
                </div>
                <div className="message">
                    {message}
                </div>
            </div>
        </div>
    )
}

function MainView() {

    const [threads, setThreads] = useState([] as Thread[]);

    // useEffect(() => {
    //     threadService
    //         .getThreads()
    //         .then(threads => setThreads(threads));
    // });

    return (
        <div className="content-overview">
            <NewThread/>
            {threads.map(thread =>
                <SubjectCard starter={thread.sender_id} usernames={thread.receivers}
                             subject={thread.subject}/>
            )}
            <SubjectCard starter="Hans van Os" usernames={["Hans van Os"]} subject="Subject2"/>
            <SubjectCard starter="Hans van Os" usernames={["Hans van Os"]} subject="Subject3"/>
            <SubjectCard starter="Hans van Os" usernames={["Hans van Os"]} subject="Subject4"/>
            <SubjectCard starter="Hans van Os" usernames={["Hans van Os"]} subject="Subject5"/>
            <SubjectCard starter="Hans van Os" usernames={["Hans van Os"]} subject="Subject6"/>
            <SubjectCard starter="Hans van Os" usernames={["Hans van Os"]} subject="Subject7"/>
            <SubjectCard starter="Hans van Os" usernames={["Hans van Os"]} subject="Subject8"/>
            <SubjectCard starter="Hans van Os" usernames={["Hans van Os"]} subject="Subject9"/>
            <SubjectCard
                starter="Hans van Os"
                usernames={["Hans van Os", "Hans van Os", "Hans van Os", "Hans van Os", "Mathijs Janz", "Jasmijn Manenschijn", "Youssef Airoude", "Lotte Manenschijn", "Alex Ma", "Bouke van Bergen Bravenboer", "Dennis van Daalen de Jel"]}
                subject="Subject10"/>
            <SubjectCard starter="Hans van Os" usernames={["Hans van Os"]} subject="Subject9"/>
            <SubjectCard starter="Hans van Os" usernames={["Hans van Os"]} subject="Subject9"/>
            <SubjectCard starter="Hans van Os" usernames={["Hans van Os"]} subject="Subject9"/>
            <SubjectCard starter="Hans van Os" usernames={["Hans van Os"]} subject="Subject9"/>
        </div>
    );
}

function SubjectCard(props: any) {
    const subject: string = props.subject;
    const usernames: string[] = props.usernames;
    const starter: string = props.starter;

    return (
        <Link style={{textDecoration: "inherit", color: "inherit"}} to={"/" + subject}>
            <div className="v-card clickable">
                <div className="header">
                    {/*Image placeholder*/}
                </div>
                <div className="title">
                    {subject}
                </div>
                <div className="content">
                    <div className="messages">Replies: 1</div>
                    <div className="usercount">Users: 1</div>
                </div>
                <p className="subtext">
                    Started by: <u>{starter}</u>
                </p>
            </div>
        </Link>
    )
}

function NewThread() {

    const starter: string = "Hans van Os";

    const [showButton, setShowButton] = useState(true);

    const showForm = () => {
        setShowButton(!showButton);
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
                    <div className="">
                        {/*Image placeholder*/}
                    </div>
                    <div className="title">

                    </div>
                    <div className="content">

                    </div>
                    <p className="subtext">
                        {/*Started by: <u>{starter}</u>*/}
                    </p>
                </>
            }
        </div>
    )
}


export default App;
