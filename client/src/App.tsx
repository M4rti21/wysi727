import React, {useEffect, useState} from 'react';
import {Routes, Route} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./views/Home";
import Users from "./views/Users";
import {ParallaxProvider} from "react-scroll-parallax";
import {MedalInterface, UserMedalsInterface} from "./interfaces/MedalsInterface";
import {Tooltip as ReactTooltip} from "react-tooltip";
import {ColorsType} from "./interfaces/ColorsInterface";

const App = () => {
    const [volume, setVolume] = useState<number>(50);
    const [mode, setMode] = useState<string>('osu');
    const [username, setUsername] = useState<string>('');
    const [colors, setcolors] = useState<ColorsType>(
        {
            ui: {
                font: '#f5f5f5',
                background: '#212529',
                main: '#000000'
            },
            judgements: {
                x300: '#35d4fb',
                x100: '#6cf128',
                x50: '#fbc435',
                xMiss: '#fc0606',
            },
            ranks: {
                xh: '#ffffff',
                x: '#fbc435',
                sh: '#cccccc',
                s: '#c89102',
                a: '#6cf128',
                b: '#066cf1',
                c: '#b014dc',
                d: '#e00414',
                f: '#aaaaaa'
            },
            charts: {
                lvl: '#fbc435',
                skills: '#b64757',
                global: '#fbc435',
                country: '#fbc435',
                plays: '#fbc435',
                topPp: '#35d4fb'
            }
        }
    );
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
    const handleColorChange = (colorBg: string, colorFont: string, colorSkills: string, colorLine: string, colorPP: string) => {
        colors.ui.background = colorBg;
        colors.ui.font = colorFont;
        colors.charts.global = colorLine;
        colors.charts.country = colorLine;
        colors.charts.plays = colorLine;
        colors.charts.topPp = colorPP;
        setcolors({
            ui: {
                font: colorFont,
                background: colorBg,
                main: '#000000',
            },
            judgements: {
                x300: '#35d4fb',
                x100: '#6cf128',
                x50: '#fbc435',
                xMiss: '#fc0606',
            },
            ranks: {
                xh: '#ffffff',
                x: '#fbc435',
                sh: '#cccccc',
                s: '#c89102',
                a: '#6cf128',
                b: '#066cf1',
                c: '#b014dc',
                d: '#e00414',
                f: '#aaaaaa'
            },
            charts: {
                lvl: colorSkills,
                skills: colorSkills,
                global: colorLine,
                country: colorLine,
                plays: colorLine,
                topPp: colorPP
            }
        })
    };
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
        <div style={{height: "100vh", width: "100vw", overflow: "hidden"}}>
            <ReactTooltip id="reactTooltip" style={{zIndex: 10}}/>
            <Navbar onVolumeChange={handleVolumeChange} onModeChange={handleModeChange} mode={mode}
                    username={username} onColorChange={handleColorChange}/>
            <main className="d-flex flex-column" style={
                {
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    // backgroundImage: `url(${bgs[currentBg]})`,
                    backgroundImage: `url(${require('./assets/bg.svg').default})`,
                    height: 'calc(100vh - 53.6px)',
                    width: '100%',
                    overflowY: "scroll",
                    overflowX: "hidden"
                }}>
                <ParallaxProvider>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/users/:username/:mode?"
                               element={<Users volume={volume} medals={medals} propsMode={mode}
                                               sendUsername={updateUsername} colors={colors}/>}/>
                    </Routes>
                </ParallaxProvider>
            </main>
        </div>
    );
}
export default App;