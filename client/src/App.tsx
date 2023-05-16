import React from 'react';
import {Route, Routes} from "react-router-dom";
import Navbar from "./Navbar";
import About from "./views/About";
import Info from "./views/Info";
const App = () => {
    return (
        <div className="">
            <Navbar/>
            <main className="d-flex flex-column">
                <Routes>
                    <Route path="/" element={<About/>}/>
                    <Route path="/info" element={<Info/>}/>
                </Routes>
            </main>
        </div>
    );
}
export default App;
