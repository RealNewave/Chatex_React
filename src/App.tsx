import React, {useRef, useState} from 'react';
import "./App.scss";

function App() {
    return (
        <>
            <div className="main-container">
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
            </div>
        </>
    );
}

function SubjectCard(props: any) {
    const subject: string = props.subject;
    const usernames: string[] = props.usernames;
    const starter: string = props.starter;

    return (
        <>
            <div className="v-card">
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

        </>
    )
}


export default App;
