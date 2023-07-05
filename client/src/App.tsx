import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./views/Home";
import Users from "./views/Users";
import RedirectHandler from "./RedirectHandler";
import {userSettings, UserSettingsType} from "./store/store";
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
    axios.defaults.withCredentials = true;

    const setSessionUser = userSettings((state: UserSettingsType) => state.setSessionUser);
    const [medalsSorted, setMedalsSorted] = useState<{ [key: string]: MedalInterface[] }>({});
    const [medals, setMedals] = useState<any[]>([]);

    function getMedals() {
        axios.get('http://localhost:5000/getMedals')
            .then((res) => {
                const data = res.data;
                data.sort((a: any, b: any) => {
                    if (a.Grouping === b.Grouping) {
                        return parseInt(a.value, 10) - parseInt(b.value, 10);
                    }
                    return a.Grouping.localeCompare(b.Grouping);
                });
                const categoryArrays: { [key: string]: MedalInterface[] } = {};
                for (const obj of data) {
                    if (categoryArrays[obj.Grouping]) {
                        categoryArrays[obj.Grouping].push(obj);
                    } else {
                        categoryArrays[obj.Grouping] = [obj];
                    }
                }
                setMedalsSorted(categoryArrays);
                data.sort((a: any, b: any) => {
                    return parseInt(a.MedalID) - parseInt(b.MedalID);
                });
                setMedals(data);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    function isLogged() {
        axios.get("http://localhost:5000/check")
            .then((res) => {
                if (res.data.logged) {
                    console.log(res.data);
                    setSessionUser(res.data.user)
                }
            })
            .catch((err) => {
                console.error(err);
            })
    }

    useEffect(() => {
        isLogged()
        getMedals()
    }, [])
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
                        backdropFilter: "blur(1px) brightness(40%)",
                        overflowY: "scroll",
                        marginTop: 56
                    }}>
                    <DevelopBanner develop={false}/>
                    <Routes>
                        <Route path="/oauth-redirect" element={<RedirectHandler/>}/>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/users/:urlUsername?/:urlMode?"
                               element={<Users medals={medals} medalsSorted={medalsSorted}/>}/>
                    </Routes>
                </main>
            </div>
        </ThemeProvider>
        </>
    );
}
export default App;