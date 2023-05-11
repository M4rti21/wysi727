import React from 'react';
import {Route, Routes} from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./views/Home";
import About from "./views/About";
import Info from "./views/Info";
const App = () => {
    return (
        <>
            <Navbar/>
            <main className="d-flex flex-column">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/info" element={<Info/>}/>
                </Routes>
            </main>
        </>
    );
}
export default App;
