import React, {useState} from "react";
import * as questionService from "../QuestionService";
import Modal from "react-bootstrap/Modal";

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
        props.setShow(false);
    }

    const create = async () => {
        valid();
        await questionService.createResponder(username, password);
        props.setShow(false);
    }


    return (
        <Modal show={props.show}>
            <Modal.Header>
                <Modal.Title>Create a new Question</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label htmlFor="username" className="form-label">Username</label>
                <input id="username" type="text" className="form-control" value={username}
                       onChange={(event) => setUsername(event.target.value)}/>

                <label htmlFor="password" className="form-label">Password</label>
                <input id="password" type="text" className="form-control" value={password}
                       onChange={(event) => setPassword(event.target.value)}/>
            </Modal.Body>
            <Modal.Footer>

                <button className="btn btn-primary" type="submit" onClick={login}>Login</button>
                <button className="btn btn-primary" type="submit" onClick={create}>Create</button>
            </Modal.Footer>

        </Modal>
    )
}