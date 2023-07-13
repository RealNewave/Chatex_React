import React, {useState} from "react";
import * as questionService from "../QuestionService";

import {MainView} from "../main-view/main-view";

let token: string = localStorage.getItem("token") || ""

export function Home() {
    return (
        <div className="main-container">
            {!token ? <LoginModal/> : <MainView/>}
        </div>
    )
}

export function LoginModal(props: any) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const valid = () => {
        if (!username || !password) {
            //show a message
            return;
        }
    }

    const login = () => {
        valid();

        questionService.login(username, password)
            .then(response => {
                localStorage.setItem("token", response);
                localStorage.setItem("username", username);
                setUsername("");
                setPassword("");

                window.location.reload();
            });
    }

    const create = () => {
        valid();
        questionService.createResponder(username, password);
    }


    return (
        <div className="login-modal">
            <label htmlFor="username">Username</label>
            <input id="username" type="text" value={username}
                   onChange={(event) => setUsername(event.target.value)}/>
            <label htmlFor="password">Password</label>

            <input id="password" type="text" value={password}
                   onChange={(event) => setPassword(event.target.value)}/>
            <button onClick={login}>Login</button>
            <button onClick={create}>Create</button>
        </div>
    )
}