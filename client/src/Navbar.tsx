import {Link} from "react-router-dom";
import './Navbar.css';
import VolumeSlider from "./components/VolumeSlider";
import React, {useState} from "react";
import Input from "./components/Input";
import ModeButton from "./components/ModeButton";

interface NavBarProps {
    onVolumeChange: (newVolume: number) => void;
    onModeChange: (newVolume: string) => void;
}

const Navbar: React.FC<NavBarProps> = ({onVolumeChange, onModeChange}) => {
    const [volume, setVolume] = useState<number>(10);
    const [mode, setMode] = useState<string>('osu');
    const handleVolumeChange = (newVolume: number) => {
        setVolume(newVolume);
        onVolumeChange(volume);
    };
    const handleModeChange = (modeName: string) => {
        setMode(modeName);
        onModeChange(modeName);
    };

    return (
        <div className="navBar bg-black shadow row m-0 p-2 align-items-center">
            <div className="col-5 d-flex m-0 p-0 flex-row justify-content-start align-items-center gap-3">
                <div className="d-flex justify-content-center align-items-center me-2 gap-2">
                    <img height={32} src={require('./assets/osuextra-logo.png')} alt="logo"/>
                    <div>osu!extra</div>
                </div>
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to="/">About</Link>
                <Link className="nav-link" to="/">Users</Link>
            </div>
            <div className="col-2 d-flex m-0 p-0 flex-row justify-content-center align-items-center gap-2">
                <Input/>
            </div>
            <div className="col-5 d-flex m-0 p-0 flex-row justify-content-between align-items-center ps-2">
                <div className="d-flex flex-row gap-2">
                    <ModeButton mode={mode} onModeChange={handleModeChange}/>
                    <VolumeSlider volume={volume} onVolumeChange={handleVolumeChange}/>
                </div>
                <div className="d-flex flex-row justify-content-end gap-2">
                    <a href={"https://discord.com/users/468516101639241731"} target={"_blank"}>
                        <button className="btn btn-dark">
                            <i className="bi bi-discord"></i>
                        </button>
                    </a>
                    <a href={"https://github.com/M4rti21/osu-extra-react"} target={"_blank"}>
                        <button className="btn btn-dark">
                            <i className="bi bi-github"></i>
                        </button>
                    </a>
                    <a>
                        <button className="btn btn-dark">
                            Login with osu!
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
}
export default Navbar;