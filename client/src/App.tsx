import React, {useEffect, useState} from 'react';
import {Routes, Route, useNavigate} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./views/Home";
import Users from "./views/Users";
import {ParallaxProvider} from "react-scroll-parallax";
import {MedalInterface, UserMedalsInterface} from "./interfaces/MedalsInterface";
import {Tooltip as ReactTooltip} from "react-tooltip";

const App = () => {
    const [volume, setVolume] = useState<number>(50);
    const [mode, setMode] = useState<string>('osu');
    const [username, setUsername] = useState<string>('');
    const handleVolumeChange = (newVolume: number) => {
        setVolume(newVolume);
    };
    const handleModeChange = (newMode: string) => {
        setMode(newMode);
    };
    // const [bgs, setBgs] = useState<string[]>([]);
    const [medals, setMedals] = useState<UserMedalsInterface>(
        {
            medalBeatmapSpotlights: [],
            medalBeatmapChallenges: [],
            medalBeatmapPacks: [],
            medalHushHush: [],
            medalSkills: [],
            modIntroduction: [],
        }
    );
    // const [currentBg, setCurrentBg] = useState<number>(0)
    // const getBgs = async () => {
    //     const response = await fetch(`http://localhost:5000/getBG`);
    //     const data = await response.json();
    //     if (data?.length) {
    //         setBgs(data.backgrounds.map((bg: any) => {
    //             return bg.url;
    //         }));
    //         setCurrentBg(Math.floor(Math.random() * data.backgrounds.length));
    //     }
    // }
    const getMedals = async () => {
        const response = await fetch(`http://localhost:5000/getMedals`);
        const data = await response.json();
        setMedals({
            medalBeatmapSpotlights: data.filter((medal: MedalInterface) => medal.Grouping === "Beatmap Spotlights").sort((a: MedalInterface, b: MedalInterface) => (new Date(a.Date).getTime()) - (new Date(b.Date).getTime())),
            medalBeatmapChallenges: data.filter((medal: MedalInterface) => medal.Grouping === "Beatmap Challenge Packs").sort((a: MedalInterface, b: MedalInterface) => (new Date(a.Date).getTime()) - (new Date(b.Date).getTime())),
            medalBeatmapPacks: data.filter((medal: MedalInterface) => medal.Grouping === "Beatmap Packs").sort((a: MedalInterface, b: MedalInterface) => (new Date(a.Date).getTime()) - (new Date(b.Date).getTime())),
            medalHushHush: data.filter((medal: MedalInterface) => medal.Grouping === "Hush-Hush" || medal.Grouping === "Hush-Hush (Expert)").sort((a: MedalInterface, b: MedalInterface) => (new Date(a.Date).getTime()) - (new Date(b.Date).getTime())),
            medalSkills: data.filter((medal: MedalInterface) => medal.Grouping === "Skill & Dedication").sort((a: MedalInterface, b: MedalInterface) => (new Date(a.Date).getTime()) - (new Date(b.Date).getTime())),
            modIntroduction: data.filter((medal: MedalInterface) => medal.Grouping === "Mod Introduction").sort((a: MedalInterface, b: MedalInterface) => (new Date(a.Date).getTime()) - (new Date(b.Date).getTime())),
        });
        console.log(data)
    }
    const updateUsername = (currUser: string) => {
        setUsername(currUser);
    }
    useEffect(() => {
        // getBgs().then();
        getMedals().then();
        // setTimeout(() => {
        //     setCurrentBg(Math.round(Math.random() * bgs.length))
        // }, 300000)
    }, []);
    return (
        <>
            <ReactTooltip id="reactTooltip" style={{zIndex: 10}}/>
            <Navbar onVolumeChange={handleVolumeChange} onModeChange={handleModeChange} mode={mode}
                    username={username}/>
            <main className="d-flex flex-column" style={
                {
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    // backgroundImage: `url(${bgs[currentBg]})`,
                    backgroundImage: `url(${require('./assets/bg.svg').default})`,
                    height: 'calc(100vh - 53.6px)',
                    width: '100%',
                    overflowY: "scroll"
                }}>
                <ParallaxProvider>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/users/:username/:mode?"
                               element={<Users volume={volume} medals={medals} propsMode={mode}
                                               sendUsername={updateUsername}/>}/>
                    </Routes>
                </ParallaxProvider>
            </main>
        </>
    );
}
export default App;