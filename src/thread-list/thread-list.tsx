import React, {useState} from "react";
import {ThreadListItem} from "./thread-list-item";
import {ThreadReply} from "./thread-reply";
import {ReplyToThread} from "./reply-to-thread";
import {Thread} from "./Thread";
import {Message} from "./Message";

export function Threads(props: { threads: Thread[], update: boolean, setUpdate: any }) {

    const [selected, setSelected] = useState<Map<number, boolean>>(new Map());

    function handleSelected(index: number) {
        let stateMap = selected;
        const currentState = stateMap.get(index);
        stateMap = new Map<number, boolean>();
        stateMap.set(index, !currentState);
        setSelected(stateMap);
    }

    function isHidden(index: number) {
        return selected.get(index) ? "d-block" : "d-none";
    }

    const result = props.threads.map((thread, index) => {
        return (
            <div>
                <span onClick={() => {
                    handleSelected(index)
                }}>
                    <ThreadListItem key={`thread_${index}`} thread={thread}/>
                </span>
                <span className={isHidden(index)}>
                    <div className="timeline">
                        <ul>
                            {thread.replies.map((reply: Message, subIndex) => {
                                return <li>
                                    <ThreadReply key={`reply_${subIndex}`} reply={reply}/>
                                </li>
                            })}
                            <ReplyToThread key={`reply_${index}`} setUpdate={props.setUpdate} update={props.update}
                                           index={index + 1}/>
                        </ul>
                    </div>
                </span>
            </div>
        )
    });
    return (
        <ul className="list-group">
            {result}
        </ul>
    )
}