import React from 'react';
import "./App.scss";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {LoginModal} from "./home/home";
import {MessageDetails} from "./detail-view/detail-view";
import {MainView} from "./main-view/main-view";

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginModal/>}/>
                    <Route path="/" element={<MainView/>}/>
                    <Route path="/:questionId" element={<MessageDetails/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
