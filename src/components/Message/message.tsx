import React from "react";

function ProfileDetails(props: any) {
    const username = props.username;
    const subtext = props.subtext;
    return (
        <>
            <div className="profile-details">
                <div className="flexcolumn">
                    <h5>{username}</h5>
                    <small className="text-secondary">{subtext}</small>
                </div>
            </div>
        </>
    )
}

function Message(props: any) {
    const username = props.username;
    const subtext = props.subtext;
    const time = props.time;
    return (
        <>
            <div className="custom-card">
                <div className="flexcolumn center">
                    <p>{username}</p>
                    <small>{subtext}</small>
                </div>
                <p className="right"><small className="text-secondary">{time}</small></p>
            </div>
        </>
    )
}


function MessageSent(props: any) {
    const username = props.username;
    const message = props.message;
    const time = props.time;
    return (
        <>
            <div className="custom-card border-0 text-dark ps-5">
                <div className="row g-0">
                    <div className="col-9">
                        <div className="card-body text-end">
                            <h5 className="card-title"><small className="text-secondary me-2">{time}</small>{username}
                            </h5>
                            <p className="card-text border rounded-bottom py-2"><small
                                className="me-1 fs-5">{message}</small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}