import React, {useEffect, useState} from 'react';
import {Routes, Route} from "react-router-dom";
import Navbar from "./Navbar";
import About from "./views/About";
import Info from "./views/Info";
import {ParallaxProvider} from "react-scroll-parallax";
import {ItemsEntity, ItemsEntity1, ItemsEntity2} from "./interfaces/ScoresInterface";

const App = () => {
    const [volume, setVolume] = useState<number>(50);
    const [mode, setMode] = useState<string>('osu');
    const handleVolumeChange = (newVolume: number) => {
        setVolume(newVolume);
    };
    const handleModeChange = (newMode: string) => {
        setMode(newMode);
    };
    const [bgs, setBgs] = useState<string[]>([]);
    const [currentBg, setCurrentBg] = useState<number>(0)
    const getBgs = async () => {
        const response = await fetch(`http://localhost:5000/getBG`);
        const data = await response.json();
        setBgs(data.backgrounds.map((bg: any) => {
            return bg.url;
        }));
        setCurrentBg(Math.floor(Math.random() * data.backgrounds.length));
    }
    useEffect(() => {
        getBgs().then();
        setTimeout(() => {
            setCurrentBg(Math.round(Math.random() * bgs.length))
        }, 300000)
    }, []);
    return (
        <>
            <Navbar onVolumeChange={handleVolumeChange} onModeChange={handleModeChange}/>
            <main className="d-flex flex-column" style={
                {
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundImage: `url(${bgs[currentBg]})`,
                    height: 'calc(100vh - 53.6px)',
                    width: '100%',
                    overflowY: "scroll"
                }}>
                <ParallaxProvider>
                    <Routes>
                        <Route path="/" element={<About/>}/>
                        <Route path="/users/:username" element={<Info volume={volume} username={"2"} mode={mode}/>}/>
                    </Routes>
                </ParallaxProvider>
            </main>
        </>
    );
}
export default App;