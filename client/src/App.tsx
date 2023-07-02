import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./views/Home";
import Users from "./views/Users";
import RedirectHandler from "./RedirectHandler";
import {CompactUser, userSettings, UserSettingsType} from "./store/store";
import axios from 'axios';
import {MedalInterface} from "./interfaces/MedalsInterface";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import DevelopBanner from "./components/navbar/DevelopBanner";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            light: '#ffffff',
            main: '#ffffff',
            dark: '#000000',
            contrastText: '#000000',
        },
    },
    typography: {
        button: {
            textTransform: 'none'
        }
    },
    components: {
        MuiSlider: {
            styleOverrides: {
                root: {
                    height: 2,
                    padding: '15px 0',
                    backgroundColor: '#555555',
                },
                rail: {
                    height: 2,
                    opacity: 0.5,
                    backgroundColor: '#555555',
                },
                track: {
                    height: 2,
                },
                thumb: {
                    display: 'block',
                    height: 14,
                    width: 14
                },
                mark: {
                    display: 'none',
                },
            },
        },
    },
});
const App = () => {
    const logged = userSettings((state: UserSettingsType) => state.logged);
    const toLog = userSettings((state: UserSettingsType) => state.toLog);
    const setUser = userSettings((state: UserSettingsType) => state.setUser);
    const [medals, setMedals] = useState<{ [key: string]: MedalInterface[] }>({});
    const getMedals = async () => {
        const response = await fetch(`http://localhost:5000/getMedals`);
        const data = await response.json();
        data.sort((a: any, b: any) => {
            if (a.Grouping === b.Grouping) {
                return parseInt(a.value, 10) - parseInt(b.value, 10);
            }
            return a.Grouping.localeCompare(b.Grouping);
        });
        const categoryArrays: { [key: string]: MedalInterface[] } = {};
        for (const obj of data) {
            if (categoryArrays[obj.Grouping]) {
                // Category array already exists, push the object to it
                categoryArrays[obj.Grouping].push(obj);
            } else {
                // Category array doesn't exist, create a new array with the object
                categoryArrays[obj.Grouping] = [obj];
            }
        }
        setMedals(categoryArrays);
    }
    useEffect(() => {
        getMedals().then();
    }, [])
    useEffect(() => {
        if (!logged) {
            axios.get('http://localhost:5000/login')
                .then((res) => {
                    console.log(res);
                    const userData: CompactUser = res.data;
                    console.log(userData)
                    setUser(userData);
                })
                .catch(error => {
                    if (error.response) {
                        // The request was made, but the server responded with an error status code
                        console.log(error.response.data);
                        console.log(error.response.status);
                    } else if (error.request) {
                        // The request was made, but no response was received
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
                    console.log(error.config);
                });
        }
    }, [toLog]);
    return (
        <> <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <Navbar/>
            <div style={{
                backgroundImage: `url(${require('./assets/bg.svg').default})`,
                backgroundSize: "cover",
                width: "100vw",
                overflowY: "scroll"
            }}>
                <main className="d-flex flex-column" style={
                    {
                        width: '100%',
                        backdropFilter: "blur(1px)",
                        overflowY: "scroll",
                        marginTop: 56
                    }}>
                    <DevelopBanner develop={true}/>
                    <Routes>
                        <Route path="/oauth-redirect" element={<RedirectHandler/>}/>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/users/:urlUsername?/:urlMode?"
                               element={<Users medals={medals}/>}/>
                    </Routes>
                </main>
            </div>
        </ThemeProvider>
        </>
    );
}
export default App;