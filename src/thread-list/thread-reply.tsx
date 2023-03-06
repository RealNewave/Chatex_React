import React from "react";
import {Message} from "./Message";

export function ThreadReply(props: { reply: Message }) {

    const timestamp = new Date(props.reply.timestamp).toUTCString();
    return <>
        <div className="row">
            <div className="col-12">{timestamp}</div>
        </div>
        <div className={"card my-2 info"}>
            <div className="row">
                <div className="col-2 mt-1 mb-auto ms-2">
                    <img src={require("./profile.jpg")} className="img rounded" style={{maxHeight: 5 + "em"}}/>
                </div>
                <div className="col-9">
                    <div className="card-body ms-0 vstack">
                        <div className="card-title fw-semibold">Hans van Os</div>
                        <div className="card-text">{props.reply.message}</div>
                    </div>
                </div>
            </div>
        </div>
    </>;
}