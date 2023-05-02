import React from 'react';
import "./App.scss";

function App() {
    return (
        <div className="main-container">
            {/*<MainView/>*/}
            <DetailView/>
        </div>
    );
}

function DetailView() {
    return (
        <div className="split-view">
            <div className="detail-view">
                <Message username="Hans van Os" message="Yo!" time="22:51"></Message>
                <Message username="Youssef Airoude" message="Waddup?" time="22:51"></Message>
                <Message username="Mathijs Janz" message="Ewa" time="22:51"></Message>
                <Message username="Hans van Os" message="Klaar voor de ps5 gaming?" time="22:51"></Message>
            </div>
            <div className="list-view">
                <SubjectListCard username="Hans van Os" subtext="hello!" time="22:51"></SubjectListCard>
                <SubjectListCard username="Hans van Os" subtext="hello!" time="22:51"></SubjectListCard>
                <SubjectListCard username="Hans van Os" subtext="hello!" time="22:51"></SubjectListCard>
            </div>
        </div>
    );
}

export function SubjectListCard(props: any) {
    const subject: string = props.username;
    const usernames: string[] = props.subtext;
    const time = props.time;
    return (
        <>
            <div className="h-card">
                <div className="flexcolumn center">
                    <p>{subject}</p>
                    <small>{usernames}</small>
                </div>
                <p className="right"><small className="text-secondary">{time}</small></p>
            </div>
        </>
    )
}

function Message(props: any) {
    const username: string = props.username;
    const message: string = props.message;
    const time = props.time;
    return (
        <div className="text-bubble">
            <div className="profile">
                {username.split(" ").map(part => part[0])}
            </div>
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
    return (
        <div className="content-overview">
            <SubjectCard starter="Hans van Os" usernames={["Youssef, Mathijs"]}
                         subject="Wat vinden jullie hiervan?"/>
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

    function seeDetails() {

    }

    return (
        <div className="v-card" onClick={seeDetails}>
            <div className="header">
                {/*Image placeholder*/}
            </div>
            <div className="title">
                {subject}
            </div>
            <p className="content">
                {usernames.join(", ")}
            </p>
            <p className="subtext">
                Started by: <u>{starter}</u>
            </p>
        </div>
    )
}


export default App;
