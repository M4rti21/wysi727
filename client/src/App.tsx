import React from 'react';
import {Route, Routes} from "react-router-dom";
import Navbar from "./Navbar";
import About from "./views/About";
import Info from "./views/Info";
import {ParallaxProvider} from "react-scroll-parallax";

const App = () => {
    return (
        <div className="">
            <Navbar/>
            <main className="d-flex flex-column">
                <ParallaxProvider>
                    <Routes>
                        <Route path="/" element={<About/>}/>
                        <Route path="/info" element={<Info/>}/>
                    </Routes>
                </ParallaxProvider>
            </main>
        </div>
    );
}
export default App;
