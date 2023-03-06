import React, {useState} from "react";
import axios from "axios";

export function NewThread(props: { update: boolean, setUpdate: any }) {

    const [subject, setSubject] = useState("");

    function startNewThread() {
        axios({
            method: "post",
            url: "http://localhost:8000/threads/start",
            data: {
                "sender_id": 1,
                "subject": subject
            }
        });
    }

    function handleInput(event: any) {
        setSubject(event.target.value);
    }

    return (
        <div className="col mb-2 hstack gap-4">
            <input type="text" className="form-control" placeholder={"What is the next chat about?"} value={subject}
                   onChange={handleInput}/>
            <button className="btn btn-primary" onClick={() => {
                startNewThread();
                setSubject("");
                props.setUpdate(!props.update)
            }}>Create
            </button>
        </div>
    )
}
