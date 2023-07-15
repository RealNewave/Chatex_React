import React, {useState} from "react";
import * as questionService from "../QuestionService";

export function LoginModal(props: any) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const valid = () => {
        if (!username || !password) {
            //show a message
            return;
        }
    }

    const login = async () => {
        valid();
        await questionService.login(username, password);
        setUsername("");
        setPassword("");
    }

    const create = async () => {
        valid();
        await questionService.createResponder(username, password);
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