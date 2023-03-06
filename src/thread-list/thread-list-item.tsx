import {Thread} from "./Thread";

export function ThreadListItem(props: { thread: Thread }) {
    const thread = props.thread
    return <li className="card mt-1">
        <div className="card-title d-flex justify-content-between align-items-center mx-3 my-1">
            <img src={require("./threadstarter.jpg")} className="img rounded" style={{maxHeight: 5 + "em"}}/>
            <span className="fw-bold">{thread.subject}</span>
            <span className="badge bg-primary rounded-pill">2</span>
        </div>
        {/*<div className="card-body text-center">{thread.subject}</div>*/}
    </li>;
}