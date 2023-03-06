import React, {useState} from "react";
import axios from "axios";

export function ReplyToThread(props: { update: boolean, setUpdate: any, index: number }) {

    const [message, setMessage] = useState("");

    function replyToThread() {

        axios({
            method: "post",
            url: "http://localhost:8000/threads/reply/" + props.index,
            data: {
                "sender_id": 1,
                "message": message
            }
        });
    }

    function handleInput(event: any) {
        setMessage(event.target.value);
    }

    return (
        <li>

            <div className="row mt-4">
                <div className="col-1 bullet green"/>
                <div className="col-11 pr-0">
                    <div className="hstack gap-2">
                        <div className="col-10 ms-3 ps-1">
                            <textarea className="form-control" id="new-message" rows={1} wrap={"hard"}
                                      placeholder={"Type your message"}
                                      value={message}
                                      style={{resize: "none"}}
                                      onChange={handleInput}/>
                        </div>
                        <div className="col-2 ps-4">
                            <button className="btn btn-primary" id={"send-message"}
                                    onClick={() => {
                                        replyToThread();
                                        setMessage("");
                                        props.setUpdate(!props.update)
                                    }}>Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}