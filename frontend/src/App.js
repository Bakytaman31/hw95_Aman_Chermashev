import React from 'react';
import Routes from "./Routes";
import AppToolbar from "./components/UI/Toolbar/AppToolbar";
import {ToastContainer} from "react-toastify";

function App() {
    return (
        <>
            <AppToolbar/>
            <ToastContainer autoClose={3000} />
            <Routes/>
        </>
    );
}

export default App;
