import React from 'react';
import "./App.scss";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./home/home";
import {MessageDetails} from "./detail-view/detail-view";

let username: string = localStorage.getItem("username") || "";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/:questionId" element={<MessageDetails/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
